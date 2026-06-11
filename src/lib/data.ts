
import type { StateData } from './types';

export const STATES: StateData[] = [
    { 
        "name": "Andaman and Nicobar Islands",
        "districts": [
            { "name": "Nicobar", "lat": 7.83, "lng": 93.5, "monthlyRainfallMm": [40, 20, 30, 70, 350, 500, 450, 420, 480, 300, 200, 80] },
            { "name": "North and Middle Andaman", "lat": 12.5, "lng": 92.83, "monthlyRainfallMm": [40, 20, 30, 70, 350, 500, 450, 420, 480, 300, 200, 80] },
            { "name": "South Andaman", "lat": 11.62, "lng": 92.7, "monthlyRainfallMm": [40, 20, 30, 70, 350, 500, 450, 420, 480, 300, 200, 80] }
        ]
    },
    {
        "name": "Andhra Pradesh",
        "districts": [
            { "name": "Anantapur", "lat": 14.6819, "lng": 77.6006, "monthlyRainfallMm": [5, 5, 15, 25, 60, 60, 80, 100, 130, 150, 70, 20] },
            { "name": "Chittoor", "lat": 13.21, "lng": 79.1, "monthlyRainfallMm": [10, 10, 10, 20, 50, 60, 90, 120, 140, 220, 200, 80] },
            { "name": "East Godavari", "lat": 16.9, "lng": 82.22, "monthlyRainfallMm": [10, 15, 20, 30, 70, 150, 200, 180, 200, 180, 100, 20] },
            { "name": "Guntur", "lat": 16.3067, "lng": 80.4365, "monthlyRainfallMm": [10, 15, 20, 30, 60, 110, 160, 170, 190, 160, 80, 20] },
            { "name": "Krishna", "lat": 16.5, "lng": 80.5, "monthlyRainfallMm": [10, 15, 20, 30, 60, 120, 180, 170, 190, 160, 80, 20] },
            { "name": "Kurnool", "lat": 15.8281, "lng": 78.0373, "monthlyRainfallMm": [10, 10, 15, 30, 70, 80, 100, 120, 150, 150, 60, 15] },
            { "name": "Prakasam", "lat": 15.5, "lng": 79.5, "monthlyRainfallMm": [10, 10, 15, 20, 50, 80, 120, 130, 160, 180, 120, 30] },
            { "name": "Sri Potti Sriramulu Nellore", "lat": 14.44, "lng": 79.98, "monthlyRainfallMm": [15, 10, 10, 15, 40, 50, 80, 110, 130, 250, 300, 100] },
            { "name": "Srikakulam", "lat": 18.29, "lng": 83.89, "monthlyRainfallMm": [10, 20, 25, 40, 80, 150, 180, 200, 220, 180, 50, 10] },
            { "name": "Visakhapatnam", "lat": 17.6868, "lng": 83.2185, "monthlyRainfallMm": [10, 15, 20, 35, 80, 140, 160, 180, 200, 200, 70, 10] },
            { "name": "Vizianagaram", "lat": 18.11, "lng": 83.42, "monthlyRainfallMm": [10, 20, 25, 40, 80, 150, 170, 190, 210, 180, 50, 10] },
            { "name": "West Godavari", "lat": 16.9, "lng": 81.5, "monthlyRainfallMm": [10, 15, 20, 30, 70, 150, 200, 180, 200, 180, 100, 20] },
            { "name": "Y.S.R. Kadapa", "lat": 14.47, "lng": 78.82, "monthlyRainfallMm": [5, 5, 10, 20, 60, 70, 100, 120, 140, 160, 80, 25] }
        ]
    },
    {
        "name": "Arunachal Pradesh",
        "districts": [
            { "name": "Tawang", "lat": 27.58, "lng": 91.86, "monthlyRainfallMm": [40, 80, 150, 220, 250, 450, 500, 400, 300, 150, 50, 30] },
            { "name": "West Kameng", "lat": 27.28, "lng": 92.4, "monthlyRainfallMm": [30, 60, 130, 200, 230, 400, 450, 380, 280, 140, 40, 20] },
            { "name": "East Kameng", "lat": 27.4, "lng": 93.0, "monthlyRainfallMm": [35, 70, 140, 210, 240, 420, 480, 390, 290, 150, 45, 25] },
            { "name": "Papum Pare", "lat": 27.1, "lng": 93.62, "monthlyRainfallMm": [40, 90, 180, 280, 350, 550, 600, 500, 400, 200, 60, 30] },
            { "name": "Kurung Kumey", "lat": 27.9, "lng": 93.35, "monthlyRainfallMm": [50, 100, 200, 300, 380, 600, 650, 550, 450, 220, 70, 40] },
            { "name": "Kra Daadi", "lat": 28.15, "lng": 94.1, "monthlyRainfallMm": [55, 110, 210, 310, 390, 620, 680, 580, 480, 240, 80, 45] },
            { "name": "Lower Subansiri", "lat": 27.5, "lng": 93.9, "monthlyRainfallMm": [45, 95, 190, 290, 360, 580, 620, 520, 420, 210, 65, 35] },
            { "name": "Upper Subansiri", "lat": 28.2, "lng": 94.1, "monthlyRainfallMm": [60, 120, 220, 320, 400, 650, 700, 600, 500, 250, 80, 50] },
            { "name": "West Siang", "lat": 28.25, "lng": 94.65, "monthlyRainfallMm": [70, 140, 250, 350, 450, 700, 750, 650, 550, 280, 90, 60] },
            { "name": "East Siang", "lat": 28.1, "lng": 95.33, "monthlyRainfallMm": [80, 150, 280, 400, 500, 750, 800, 700, 600, 300, 100, 70] },
            { "name": "Upper Siang", "lat": 28.8, "lng": 95.1, "monthlyRainfallMm": [90, 160, 300, 420, 520, 800, 850, 750, 650, 320, 110, 80] },
            { "name": "Dibang Valley", "lat": 28.7, "lng": 95.9, "monthlyRainfallMm": [100, 180, 320, 450, 550, 850, 900, 800, 700, 350, 120, 90] },
            { "name": "Lower Dibang Valley", "lat": 28.2, "lng": 95.8, "monthlyRainfallMm": [90, 170, 300, 430, 530, 820, 880, 780, 680, 340, 110, 80] },
            { "name": "Lohit", "lat": 27.9, "lng": 96.3, "monthlyRainfallMm": [110, 200, 350, 480, 580, 900, 950, 850, 750, 380, 130, 100] },
            { "name": "Anjaw", "lat": 28.1, "lng": 96.8, "monthlyRainfallMm": [120, 220, 380, 500, 600, 950, 1000, 900, 800, 400, 140, 110] },
            { "name": "Changlang", "lat": 27.4, "lng": 96.1, "monthlyRainfallMm": [80, 150, 280, 400, 500, 750, 800, 700, 600, 300, 100, 70] },
            { "name": "Tirap", "lat": 27.1, "lng": 95.6, "monthlyRainfallMm": [70, 140, 250, 350, 450, 700, 750, 650, 550, 280, 90, 60] },
            { "name": "Longding", "lat": 26.9, "lng": 95.3, "monthlyRainfallMm": [60, 120, 220, 320, 400, 650, 700, 600, 500, 250, 80, 50] }
        ]
    },
    {
        "name": "Assam",
        "districts": [
            { "name": "Baksa", "lat": 26.7, "lng": 91.3, "monthlyRainfallMm": [30, 60, 130, 250, 350, 500, 550, 450, 350, 150, 40, 20] },
            { "name": "Barpeta", "lat": 26.32, "lng": 91.0, "monthlyRainfallMm": [25, 50, 120, 230, 330, 480, 520, 430, 330, 140, 35, 15] },
            { "name": "Biswanath", "lat": 26.7, "lng": 93.16, "monthlyRainfallMm": [35, 70, 150, 280, 380, 550, 600, 500, 400, 180, 50, 25] },
            { "name": "Bongaigaon", "lat": 26.47, "lng": 90.56, "monthlyRainfallMm": [20, 45, 110, 220, 320, 470, 500, 420, 320, 130, 30, 10] },
            { "name": "Cachar", "lat": 24.8, "lng": 92.8, "monthlyRainfallMm": [30, 70, 180, 350, 500, 650, 700, 600, 500, 250, 80, 30] },
            { "name": "Charaideo", "lat": 27.0, "lng": 95.0, "monthlyRainfallMm": [40, 80, 180, 300, 400, 600, 650, 550, 450, 200, 60, 30] },
            { "name": "Chirang", "lat": 26.65, "lng": 90.65, "monthlyRainfallMm": [25, 55, 125, 240, 340, 490, 530, 440, 340, 145, 38, 18] },
            { "name": "Darrang", "lat": 26.5, "lng": 92.0, "monthlyRainfallMm": [30, 65, 140, 260, 360, 520, 570, 470, 370, 160, 45, 22] },
            { "name": "Dhemaji", "lat": 27.48, "lng": 94.58, "monthlyRainfallMm": [50, 100, 220, 350, 450, 700, 750, 650, 550, 250, 70, 40] },
            { "name": "Dhubri", "lat": 26.02, "lng": 89.97, "monthlyRainfallMm": [15, 35, 90, 200, 300, 450, 480, 400, 300, 120, 25, 8] },
            { "name": "Dibrugarh", "lat": 27.48, "lng": 94.9, "monthlyRainfallMm": [45, 90, 200, 320, 420, 650, 700, 600, 500, 220, 65, 35] },
            { "name": "Dima Hasao", "lat": 25.3, "lng": 93.0, "monthlyRainfallMm": [40, 80, 200, 380, 550, 700, 750, 650, 550, 280, 90, 40] },
            { "name": "Goalpara", "lat": 26.17, "lng": 90.62, "monthlyRainfallMm": [20, 40, 100, 210, 310, 460, 490, 410, 310, 125, 28, 9] },
            { "name": "Golaghat", "lat": 26.52, "lng": 93.97, "monthlyRainfallMm": [38, 75, 160, 290, 390, 580, 620, 520, 420, 190, 55, 28] },
            { "name": "Hailakandi", "lat": 24.68, "lng": 92.57, "monthlyRainfallMm": [35, 75, 190, 360, 520, 680, 720, 620, 520, 260, 85, 35] },
            { "name": "Hojai", "lat": 26.0, "lng": 92.87, "monthlyRainfallMm": [32, 68, 145, 270, 370, 530, 580, 480, 380, 170, 48, 24] },
            { "name": "Jorhat", "lat": 26.75, "lng": 94.22, "monthlyRainfallMm": [40, 80, 170, 300, 400, 590, 630, 530, 430, 195, 58, 29] },
            { "name": "Kamrup", "lat": 26.18, "lng": 91.5, "monthlyRainfallMm": [28, 58, 130, 240, 340, 490, 530, 440, 340, 145, 38, 18] },
            { "name": "Kamrup Metropolitan", "lat": 26.14, "lng": 91.73, "monthlyRainfallMm": [28, 58, 130, 240, 340, 490, 530, 440, 340, 145, 38, 18] },
            { "name": "Karbi Anglong", "lat": 26.0, "lng": 93.5, "monthlyRainfallMm": [35, 70, 150, 280, 380, 550, 600, 500, 400, 180, 50, 25] },
            { "name": "Karimganj", "lat": 24.87, "lng": 92.35, "monthlyRainfallMm": [38, 80, 200, 380, 540, 700, 740, 640, 540, 270, 90, 38] },
            { "name": "Kokrajhar", "lat": 26.4, "lng": 90.27, "monthlyRainfallMm": [22, 50, 120, 230, 330, 480, 510, 430, 330, 135, 32, 12] },
            { "name": "Lakhimpur", "lat": 27.23, "lng": 94.1, "monthlyRainfallMm": [55, 110, 230, 360, 460, 720, 770, 670, 570, 260, 75, 45] },
            { "name": "Majuli", "lat": 26.9, "lng": 94.2, "monthlyRainfallMm": [42, 85, 180, 310, 410, 600, 640, 540, 440, 200, 60, 30] },
            { "name": "Morigaon", "lat": 26.25, "lng": 92.33, "monthlyRainfallMm": [30, 62, 135, 250, 350, 500, 540, 450, 350, 150, 40, 20] },
            { "name": "Nagaon", "lat": 26.35, "lng": 92.68, "monthlyRainfallMm": [32, 65, 140, 260, 360, 510, 550, 460, 360, 160, 42, 21] },
            { "name": "Nalbari", "lat": 26.45, "lng": 91.43, "monthlyRainfallMm": [26, 52, 122, 232, 332, 482, 522, 432, 332, 142, 36, 16] },
            { "name": "Sivasagar", "lat": 26.98, "lng": 94.63, "monthlyRainfallMm": [42, 82, 172, 302, 402, 592, 632, 532, 432, 198, 59, 30] },
            { "name": "Sonitpur", "lat": 26.8, "lng": 92.8, "monthlyRainfallMm": [38, 78, 168, 298, 398, 588, 628, 528, 428, 188, 52, 26] },
            { "name": "South Salmara-Mankachar", "lat": 25.8, "lng": 89.85, "monthlyRainfallMm": [18, 38, 95, 205, 305, 455, 485, 405, 305, 122, 26, 8] },
            { "name": "Tinsukia", "lat": 27.5, "lng": 95.35, "monthlyRainfallMm": [50, 100, 210, 330, 430, 660, 710, 610, 510, 230, 68, 38] },
            { "name": "Udalguri", "lat": 26.75, "lng": 92.1, "monthlyRainfallMm": [32, 68, 145, 265, 365, 525, 575, 475, 375, 165, 46, 23] },
            { "name": "West Karbi Anglong", "lat": 25.8, "lng": 92.8, "monthlyRainfallMm": [38, 75, 155, 285, 385, 555, 605, 505, 405, 185, 52, 28] }
        ]
    },
    {
        "name": "Bihar",
        "districts": [
            { "name": "Araria", "lat": 26.15, "lng": 87.42, "monthlyRainfallMm": [10, 15, 12, 30, 80, 250, 350, 300, 250, 80, 8, 5] },
            { "name": "Arwal", "lat": 25.25, "lng": 84.67, "monthlyRainfallMm": [15, 18, 10, 8, 25, 150, 300, 280, 200, 50, 6, 4] },
            { "name": "Aurangabad", "lat": 24.75, "lng": 84.37, "monthlyRainfallMm": [18, 20, 12, 10, 30, 180, 320, 300, 220, 60, 8, 5] },
            { "name": "Banka", "lat": 24.88, "lng": 86.92, "monthlyRainfallMm": [15, 22, 15, 18, 40, 200, 340, 310, 240, 70, 9, 6] },
            { "name": "Begusarai", "lat": 25.42, "lng": 86.13, "monthlyRainfallMm": [12, 16, 9, 15, 50, 220, 330, 290, 230, 60, 7, 4] },
            { "name": "Bhagalpur", "lat": 25.25, "lng": 86.98, "monthlyRainfallMm": [14, 20, 12, 25, 60, 240, 360, 320, 260, 75, 8, 5] },
            { "name": "Bhojpur", "lat": 25.57, "lng": 84.67, "monthlyRainfallMm": [14, 17, 9, 7, 28, 160, 310, 290, 210, 55, 7, 4] },
            { "name": "Buxar", "lat": 25.57, "lng": 83.98, "monthlyRainfallMm": [16, 18, 8, 6, 25, 140, 290, 270, 190, 45, 6, 3] },
            { "name": "Darbhanga", "lat": 26.17, "lng": 85.9, "monthlyRainfallMm": [10, 14, 8, 20, 60, 240, 360, 310, 260, 70, 6, 4] },
            { "name": "East Champaran", "lat": 26.58, "lng": 84.9, "monthlyRainfallMm": [12, 18, 10, 22, 70, 260, 380, 330, 270, 75, 7, 5] },
            { "name": "Gaya", "lat": 24.78, "lng": 85.0, "monthlyRainfallMm": [20, 22, 13, 11, 32, 190, 330, 310, 230, 65, 9, 6] },
            { "name": "Gopalganj", "lat": 26.47, "lng": 84.43, "monthlyRainfallMm": [14, 19, 9, 18, 65, 230, 350, 320, 250, 65, 6, 4] },
            { "name": "Jamui", "lat": 24.92, "lng": 86.22, "monthlyRainfallMm": [18, 25, 18, 20, 45, 210, 350, 320, 250, 80, 10, 7] },
            { "name": "Jehanabad", "lat": 25.22, "lng": 84.98, "monthlyRainfallMm": [16, 19, 11, 9, 28, 170, 320, 300, 220, 58, 7, 5] },
            { "name": "Kaimur", "lat": 25.05, "lng": 83.62, "monthlyRainfallMm": [20, 24, 12, 8, 28, 160, 310, 300, 210, 50, 8, 5] },
            { "name": "Katihar", "lat": 25.53, "lng": 87.58, "monthlyRainfallMm": [12, 18, 14, 35, 90, 270, 380, 330, 270, 90, 10, 6] },
            { "name": "Khagaria", "lat": 25.5, "lng": 86.48, "monthlyRainfallMm": [11, 15, 10, 20, 55, 230, 340, 300, 240, 65, 7, 4] },
            { "name": "Kishanganj", "lat": 26.1, "lng": 87.95, "monthlyRainfallMm": [15, 20, 18, 40, 120, 300, 400, 350, 300, 100, 12, 8] },
            { "name": "Lakhisarai", "lat": 25.17, "lng": 86.1, "monthlyRainfallMm": [14, 20, 14, 16, 42, 205, 345, 315, 245, 75, 9, 6] },
            { "name": "Madhepura", "lat": 25.92, "lng": 86.78, "monthlyRainfallMm": [11, 16, 11, 25, 70, 250, 360, 320, 260, 80, 8, 5] },
            { "name": "Madhubani", "lat": 26.37, "lng": 86.08, "monthlyRainfallMm": [9, 13, 9, 22, 65, 250, 370, 320, 270, 75, 7, 4] },
            { "name": "Munger", "lat": 25.38, "lng": 86.47, "monthlyRainfallMm": [13, 18, 13, 18, 48, 210, 350, 320, 250, 70, 8, 5] },
            { "name": "Muzaffarpur", "lat": 26.12, "lng": 85.37, "monthlyRainfallMm": [11, 15, 9, 19, 62, 245, 365, 315, 265, 72, 6, 4] },
            { "name": "Nalanda", "lat": 25.13, "lng": 85.52, "monthlyRainfallMm": [15, 18, 12, 12, 35, 180, 330, 310, 230, 62, 8, 5] },
            { "name": "Nawada", "lat": 24.88, "lng": 85.53, "monthlyRainfallMm": [18, 21, 14, 13, 38, 190, 340, 320, 240, 70, 9, 6] },
            { "name": "Patna", "lat": 25.61, "lng": 85.14, "monthlyRainfallMm": [14, 17, 10, 10, 30, 170, 320, 300, 220, 60, 7, 4] },
            { "name": "Purnia", "lat": 25.78, "lng": 87.47, "monthlyRainfallMm": [11, 17, 13, 32, 85, 260, 370, 325, 265, 85, 9, 5] },
            { "name": "Rohtas", "lat": 25.07, "lng": 84.02, "monthlyRainfallMm": [19, 22, 11, 7, 26, 155, 305, 295, 205, 48, 7, 4] },
            { "name": "Saharsa", "lat": 25.88, "lng": 86.6, "monthlyRainfallMm": [10, 15, 10, 24, 68, 245, 355, 315, 255, 78, 8, 5] },
            { "name": "Samastipur", "lat": 25.85, "lng": 85.78, "monthlyRainfallMm": [11, 15, 8, 18, 58, 235, 355, 305, 255, 68, 6, 4] },
            { "name": "Saran", "lat": 25.9, "lng": 84.85, "monthlyRainfallMm": [13, 16, 9, 15, 55, 210, 330, 300, 240, 60, 6, 4] },
            { "name": "Sheikhpura", "lat": 25.13, "lng": 85.85, "monthlyRainfallMm": [16, 20, 15, 15, 40, 195, 345, 315, 245, 72, 9, 6] },
            { "name": "Sheohar", "lat": 26.52, "lng": 85.3, "monthlyRainfallMm": [10, 16, 9, 20, 68, 255, 375, 325, 275, 78, 7, 5] },
            { "name": "Sitamarhi", "lat": 26.6, "lng": 85.48, "monthlyRainfallMm": [11, 17, 10, 21, 70, 260, 380, 330, 280, 80, 7, 5] },
            { "name": "Siwan", "lat": 26.22, "lng": 84.35, "monthlyRainfallMm": [15, 18, 8, 17, 60, 220, 340, 310, 240, 62, 6, 4] },
            { "name": "Supaul", "lat": 26.12, "lng": 86.6, "monthlyRainfallMm": [10, 16, 12, 28, 75, 260, 370, 330, 270, 85, 9, 5] },
            { "name": "Vaishali", "lat": 25.9, "lng": 85.1, "monthlyRainfallMm": [12, 16, 9, 16, 50, 200, 320, 290, 230, 60, 6, 4] },
            { "name": "West Champaran", "lat": 27.1, "lng": 84.5, "monthlyRainfallMm": [15, 20, 12, 25, 80, 280, 400, 350, 290, 85, 8, 6] }
        ]
    },
     {
        "name": "Delhi",
        "districts": [
            { "name": "Central Delhi", "lat": 28.63, "lng": 77.22, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "East Delhi", "lat": 28.63, "lng": 77.29, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "New Delhi", "lat": 28.6139, "lng": 77.2090, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "North Delhi", "lat": 28.67, "lng": 77.21, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "North East Delhi", "lat": 28.7, "lng": 77.27, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "North West Delhi", "lat": 28.73, "lng": 77.1, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "Shahdara", "lat": 28.67, "lng": 77.3, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "South Delhi", "lat": 28.52, "lng": 77.22, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "South East Delhi", "lat": 28.55, "lng": 77.27, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "South West Delhi", "lat": 28.58, "lng": 77.08, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] },
            { "name": "West Delhi", "lat": 28.65, "lng": 77.1, "monthlyRainfallMm": [20, 25, 30, 10, 5, 80, 280, 260, 120, 20, 5, 10] }
        ]
    },
    {
        "name": "Tamil Nadu",
        "districts": [
            { "name": "Ariyalur", "lat": 11.14, "lng": 79.08, "monthlyRainfallMm": [15, 10, 15, 40, 70, 60, 80, 90, 120, 180, 160, 80] },
            { "name": "Chengalpattu", "lat": 12.68, "lng": 79.98, "monthlyRainfallMm": [25, 15, 15, 25, 50, 55, 90, 110, 120, 250, 350, 150] },
            { "name": "Chennai", "lat": 13.08, "lng": 80.27, "monthlyRainfallMm": [30, 10, 15, 20, 40, 50, 100, 120, 130, 280, 400, 200] },
            { "name": "Coimbatore", "lat": 11.01, "lng": 76.95, "monthlyRainfallMm": [15, 15, 25, 70, 130, 60, 70, 40, 60, 150, 160, 50] },
            { "name": "Cuddalore", "lat": 11.75, "lng": 79.75, "monthlyRainfallMm": [20, 10, 10, 20, 40, 50, 70, 90, 120, 250, 300, 150] },
            { "name": "Dharmapuri", "lat": 12.12, "lng": 78.16, "monthlyRainfallMm": [10, 10, 15, 50, 100, 60, 70, 80, 120, 170, 120, 50] },
            { "name": "Dindigul", "lat": 10.36, "lng": 77.95, "monthlyRainfallMm": [15, 15, 25, 70, 80, 40, 50, 70, 90, 180, 150, 60] },
            { "name": "Erode", "lat": 11.34, "lng": 77.71, "monthlyRainfallMm": [10, 10, 20, 60, 110, 50, 60, 60, 90, 160, 140, 40] },
            { "name": "Kallakurichi", "lat": 11.74, "lng": 78.96, "monthlyRainfallMm": [10, 10, 15, 40, 80, 60, 80, 100, 130, 180, 150, 70] },
            { "name": "Kanchipuram", "lat": 12.83, "lng": 79.7, "monthlyRainfallMm": [20, 10, 10, 20, 40, 50, 80, 100, 120, 240, 320, 140] },
            { "name": "Kanyakumari", "lat": 8.08, "lng": 77.53, "monthlyRainfallMm": [30, 30, 50, 100, 200, 350, 250, 150, 100, 220, 200, 80] },
            { "name": "Karur", "lat": 10.95, "lng": 78.08, "monthlyRainfallMm": [10, 10, 15, 50, 70, 30, 40, 50, 80, 150, 130, 40] },
            { "name": "Krishnagiri", "lat": 12.52, "lng": 78.21, "monthlyRainfallMm": [10, 8, 12, 45, 110, 70, 80, 90, 140, 180, 130, 60] },
            { "name": "Madurai", "lat": 9.92, "lng": 78.12, "monthlyRainfallMm": [20, 20, 30, 70, 80, 40, 60, 80, 100, 180, 160, 70] },
            { "name": "Mayiladuthurai", "lat": 11.1, "lng": 79.65, "monthlyRainfallMm": [25, 15, 20, 30, 50, 50, 60, 80, 110, 280, 350, 180] },
            { "name": "Nagapattinam", "lat": 10.76, "lng": 79.84, "monthlyRainfallMm": [30, 20, 25, 35, 40, 40, 50, 70, 100, 300, 400, 200] },
            { "name": "Namakkal", "lat": 11.22, "lng": 78.16, "monthlyRainfallMm": [10, 10, 15, 50, 90, 40, 50, 60, 90, 160, 130, 40] },
            { "name": "Nilgiris", "lat": 11.41, "lng": 76.73, "monthlyRainfallMm": [20, 20, 40, 120, 180, 150, 180, 120, 130, 200, 180, 60] },
            { "name": "Perambalur", "lat": 11.23, "lng": 78.88, "monthlyRainfallMm": [15, 10, 15, 40, 60, 50, 70, 80, 110, 170, 150, 70] },
            { "name": "Pudukkottai", "lat": 10.38, "lng": 78.82, "monthlyRainfallMm": [20, 15, 20, 50, 70, 40, 50, 70, 100, 200, 180, 90] },
            { "name": "Ramanathapuram", "lat": 9.36, "lng": 78.83, "monthlyRainfallMm": [30, 20, 25, 40, 50, 20, 30, 40, 80, 220, 250, 120] },
            { "name": "Ranipet", "lat": 12.92, "lng": 79.33, "monthlyRainfallMm": [15, 10, 10, 25, 60, 50, 90, 110, 130, 200, 220, 100] },
            { "name": "Salem", "lat": 11.66, "lng": 78.14, "monthlyRainfallMm": [10, 10, 15, 60, 120, 70, 80, 90, 130, 180, 140, 50] },
            { "name": "Sivaganga", "lat": 9.85, "lng": 78.48, "monthlyRainfallMm": [25, 20, 25, 60, 70, 30, 40, 60, 90, 190, 180, 80] },
            { "name": "Tenkasi", "lat": 8.96, "lng": 77.3, "monthlyRainfallMm": [30, 30, 50, 90, 150, 250, 200, 120, 100, 200, 180, 80] },
            { "name": "Thanjavur", "lat": 10.78, "lng": 79.13, "monthlyRainfallMm": [20, 15, 20, 40, 60, 40, 50, 70, 100, 220, 250, 120] },
            { "name": "Theni", "lat": 10.01, "lng": 77.48, "monthlyRainfallMm": [20, 25, 40, 80, 90, 60, 80, 60, 80, 170, 160, 70] },
            { "name": "Thoothukudi", "lat": 8.76, "lng": 78.13, "monthlyRainfallMm": [40, 30, 30, 50, 40, 10, 20, 30, 60, 180, 220, 100] },
            { "name": "Tiruchirappalli", "lat": 10.8, "lng": 78.68, "monthlyRainfallMm": [15, 10, 15, 45, 70, 40, 50, 60, 90, 160, 140, 60] },
            { "name": "Tirunelveli", "lat": 8.71, "lng": 77.75, "monthlyRainfallMm": [40, 30, 40, 70, 80, 50, 40, 40, 60, 190, 210, 100] },
            { "name": "Tirupathur", "lat": 12.49, "lng": 78.57, "monthlyRainfallMm": [10, 8, 12, 35, 90, 60, 80, 100, 140, 190, 150, 70] },
            { "name": "Tiruppur", "lat": 11.1, "lng": 77.34, "monthlyRainfallMm": [10, 10, 20, 60, 100, 40, 50, 40, 70, 150, 150, 40] },
            { "name": "Tiruvallur", "lat": 13.13, "lng": 79.91, "monthlyRainfallMm": [25, 15, 10, 20, 40, 50, 90, 110, 120, 260, 360, 160] },
            { "name": "Tiruvannamalai", "lat": 12.22, "lng": 79.07, "monthlyRainfallMm": [10, 8, 10, 30, 70, 60, 90, 110, 140, 190, 180, 90] },
            { "name": "Tiruvarur", "lat": 10.77, "lng": 79.63, "monthlyRainfallMm": [25, 20, 25, 30, 40, 40, 50, 70, 100, 280, 380, 190] },
            { "name": "Vellore", "lat": 12.91, "lng": 79.13, "monthlyRainfallMm": [15, 10, 10, 25, 70, 50, 90, 110, 130, 190, 200, 90] },
            { "name": "Viluppuram", "lat": 11.94, "lng": 79.49, "monthlyRainfallMm": [15, 10, 10, 25, 50, 50, 70, 90, 120, 220, 250, 120] },
            { "name": "Virudhunagar", "lat": 9.58, "lng": 77.95, "monthlyRainfallMm": [25, 25, 35, 70, 70, 30, 40, 50, 80, 170, 160, 70] }
        ]
    }
];


export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Constants for calculations
export const RUNOFF_COEFFICIENT = 0.85;
export const TANK_COST_PER_LITER = 3; // in currency units
export const WATER_COST_PER_LITER = 0.015; // in currency units
export const DAILY_WATER_PER_PERSON_LITERS = 135;
export const COST_BENEFIT_YEARS = 10; // years to project for chart

    
    

    