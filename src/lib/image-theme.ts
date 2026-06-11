
// A simple color clustering algorithm (k-means)
function getDominantColors(
  imageData: ImageData,
  k: number = 5
): [number, number, number][] {
  const pixels = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    // Avoid transparent, white, and black pixels for better results
    if (imageData.data[i + 3] > 128) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      if (!(r > 250 && g > 250 && b > 250) && !(r < 5 && g < 5 && b < 5)) {
        pixels.push([r, g, b]);
      }
    }
  }

  if (pixels.length === 0) return [[100, 100, 100]]; // Return a default gray if no pixels

  // Select initial centroids randomly from the pixels
  let centroids: [number, number, number][] = pixels
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, k);
  let clusters: number[][] = [];

  for (let iter = 0; iter < 10; iter++) {
    clusters = Array.from({ length: k }, () => []);
    
    // Assign each pixel to the closest centroid
    for (const pixel of pixels) {
      let minDistance = Infinity;
      let closestCentroidIndex = 0;
      for (let i = 0; i < centroids.length; i++) {
        const distance = Math.sqrt(
          Math.pow(pixel[0] - centroids[i][0], 2) +
            Math.pow(pixel[1] - centroids[i][1], 2) +
            Math.pow(pixel[2] - centroids[i][2], 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroidIndex = i;
        }
      }
      clusters[closestCentroidIndex].push(pixels.indexOf(pixel));
    }

    // Recalculate centroids
    const newCentroids = [];
    for (let i = 0; i < clusters.length; i++) {
      if (clusters[i].length > 0) {
        const sum = clusters[i].reduce(
          (acc, pixelIndex) => {
            acc[0] += pixels[pixelIndex][0];
            acc[1] += pixels[pixelIndex][1];
            acc[2] += pixels[pixelIndex][2];
            return acc;
          },
          [0, 0, 0]
        );
        newCentroids.push([
          Math.round(sum[0] / clusters[i].length),
          Math.round(sum[1] / clusters[i].length),
          Math.round(sum[2] / clusters[i].length),
        ] as [number, number, number]);
      } else {
         // If a centroid has no points, reinitialize it
         newCentroids.push(pixels[Math.floor(Math.random() * pixels.length)]);
      }
    }
    
    // Check for convergence (simplified)
    if (JSON.stringify(centroids) === JSON.stringify(newCentroids)) {
      break;
    }
    centroids = newCentroids;
  }

  // Sort centroids by cluster size (desc) to get dominant ones first
  return centroids.sort((a,b) => {
      const aCluster = clusters[centroids.indexOf(a)]?.length || 0;
      const bCluster = clusters[centroids.indexOf(b)]?.length || 0;
      return bCluster - aCluster;
  });
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function getTextColor(bgColor: [number, number, number]): string {
    const [r,g,b] = bgColor;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "224 71.4% 4.1%" : "355.7 100% 97.3%";
}

function getMutedColor(h: number, s: number, l: number): string {
    return `${h.toFixed(1)} ${(s * 0.5).toFixed(1)}% ${(l + (100 - l) * 0.5).toFixed(1)}%`
}

function getBorderColor(h: number, s: number, l: number): string {
    return `${h.toFixed(1)} ${(s * 0.7).toFixed(1)}% ${(l + (100 - l) * 0.4).toFixed(1)}%`
}


export async function generateThemeFromImage(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas context not available");

        const scale = Math.min(200 / img.width, 200 / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const dominantColors = getDominantColors(imageData);
        
        if (dominantColors.length < 2) return reject("Could not extract enough colors.");

        const [primaryRgb, accentRgb] = dominantColors;

        const [primaryH, primaryS, primaryL] = rgbToHsl(...primaryRgb);
        const [accentH, accentS, accentL] = rgbToHsl(...accentRgb);

        const backgroundL = 95;
        const backgroundS = 30;

        const themeCss = `
          .custom-image {
            --background: ${primaryH.toFixed(1)} ${backgroundS}% ${backgroundL}%;
            --foreground: ${primaryH.toFixed(1)} 25% 10%;

            --card: ${primaryH.toFixed(1)} ${backgroundS}% ${backgroundL - 2}%;
            --card-foreground: ${primaryH.toFixed(1)} 25% 10%;

            --popover: ${primaryH.toFixed(1)} ${backgroundS}% ${backgroundL - 2}%;
            --popover-foreground: ${primaryH.toFixed(1)} 25% 10%;

            --primary: ${primaryH.toFixed(1)} ${primaryS.toFixed(1)}% ${Math.max(40, primaryL).toFixed(1)}%;
            --primary-foreground: ${getTextColor(primaryRgb)};

            --secondary: ${getMutedColor(primaryH, primaryS, primaryL)};
            --secondary-foreground: ${primaryH.toFixed(1)} 25% 10%;

            --muted: ${getMutedColor(primaryH, primaryS, primaryL)};
            --muted-foreground: ${primaryH.toFixed(1)} 25% 30%;
            
            --accent: ${accentH.toFixed(1)} ${accentS.toFixed(1)}% ${Math.max(45, accentL).toFixed(1)}%;
            --accent-foreground: ${getTextColor(accentRgb)};
            
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 0 0% 98%;

            --border: ${getBorderColor(primaryH, primaryS, primaryL)};
            --input: ${getBorderColor(primaryH, primaryS, primaryL)};
            --ring: ${accentH.toFixed(1)} ${accentS.toFixed(1)}% ${Math.max(45, accentL).toFixed(1)}%;

            --chart-1: ${primaryH.toFixed(1)} ${primaryS.toFixed(1)}% ${Math.max(40, primaryL).toFixed(1)}%;
            --chart-2: ${accentH.toFixed(1)} ${accentS.toFixed(1)}% ${Math.max(45, accentL).toFixed(1)}%;
          }
        `;

        resolve(themeCss);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });
}
