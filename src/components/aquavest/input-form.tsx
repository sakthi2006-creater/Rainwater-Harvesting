
'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, MapPin, Users, LocateFixed, Mic, User, Layers, Map } from 'lucide-react';
import { STATES } from '@/lib/data';
import type { DistrictData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  roofArea: z.coerce.number().positive({ message: 'Roof area must be positive.' }),
  location: z.string().min(1, { message: 'Please select a state.' }),
  district: z.string().min(1, { message: 'Please select a district.' }),
  population: z.coerce.number().int().positive({ message: 'Population must be a positive number.' }),
  openSpace: z.coerce.number().nonnegative({ message: 'Open space must be a non-negative number.' }),
});

type InputFormProps = {
  onCalculate: (values: z.infer<typeof formSchema>) => void;
  isCalculating: boolean;
};

// Haversine distance function
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

// Levenshtein distance function for fuzzy string matching
const levenshteinDistance = (s1: string, s2: string): number => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= s2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= s2.length; j += 1) {
        for (let i = 1; i <= s1.length; i += 1) {
            const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            );
        }
    }
    return track[s2.length][s1.length];
};


export function InputForm({ onCalculate, isCalculating }: InputFormProps) {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isLocating, setIsLocating] = useState(false);
  const [listeningField, setListeningField] = useState<keyof z.infer<typeof formSchema> | null>(null);
  const [districts, setDistricts] = useState<DistrictData[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      roofArea: 100,
      location: 'Delhi',
      district: 'New Delhi',
      population: 4,
      openSpace: 50,
    },
  });

  const selectedState = form.watch('location');

  useEffect(() => {
    if (selectedState) {
        const stateData = STATES.find(s => s.name === selectedState);
        const availableDistricts = stateData ? stateData.districts : [];
        setDistricts(availableDistricts);
        
        // When state changes, reset the district
        const currentDistrict = form.getValues('district');
        if (availableDistricts.length > 0 && !availableDistricts.find(d => d.name === currentDistrict)) {
            form.setValue('district', availableDistricts[0].name, { shouldValidate: true });
        } else if (availableDistricts.length === 0) {
            form.setValue('district', '', { shouldValidate: true });
        }
    } else {
        setDistricts([]);
        form.setValue('district', '', { shouldValidate: true });
    }
  }, [selectedState, form]);
  
  useEffect(() => {
    const defaultStateData = STATES.find(s => s.name === form.getValues('location'));
    if (defaultStateData) {
        setDistricts(defaultStateData.districts);
    }
  }, []); // Run only once on mount

  const handleCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: t('toast_geolocation_not_supported_title'),
        description: t('toast_geolocation_not_supported_description'),
      });
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        let closestState = '';
        let closestDistrict = '';
        let minDistance = Infinity;

        STATES.forEach((state) => {
          state.districts.forEach((district) => {
            const distance = getDistance(latitude, longitude, district.lat, district.lng);
            if (distance < minDistance) {
              minDistance = distance;
              closestState = state.name;
              closestDistrict = district.name;
            }
          });
        });

        form.setValue('location', closestState, { shouldValidate: true });
        form.setValue('district', closestDistrict, { shouldValidate: true });
        toast({
            title: t('toast_location_updated_title'),
            description: t('toast_location_updated_description', { location: `${closestDistrict}, ${closestState}` })
        })
        setIsLocating(false);
      },
      () => {
        toast({
            variant: 'destructive',
            title: t('toast_location_failed_title'),
            description: t('toast_location_failed_description'),
        });
        setIsLocating(false);
      }
    );
  };
  
  const handleVoiceInput = (field: keyof z.infer<typeof formSchema>) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: 'destructive',
        title: t('toast_voice_not_supported_title'),
        description: t('toast_voice_not_supported_description'),
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListeningField(field);
    };

    recognition.onerror = (event: any) => {
      toast({
        variant: 'destructive',
        title: t('toast_voice_error_title'),
        description: event.error,
      });
      setListeningField(null);
    };
    
    recognition.onend = () => {
        setListeningField(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      
      if (field === 'roofArea' || field === 'population' || field === 'openSpace') {
        const numericValue = parseInt(transcript.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(numericValue)) {
          form.setValue(field, numericValue, { shouldValidate: true });
        } else {
          toast({ variant: 'destructive', title: t('toast_invalid_number_title'), description: t('toast_invalid_number_description', { transcript }) });
        }
      } else if (field === 'location' || field === 'district') {
        let bestMatch = '';
        let minDistance = Infinity;

        const allLocations = field === 'location' ? STATES.map(s => s.name) : districts.map(d => d.name);

        allLocations.forEach(locName => {
            const distance = levenshteinDistance(transcript, locName);
            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = locName;
            }
        });
        
        if (minDistance < 4) { // Increased threshold for more flexible matching
            form.setValue(field, bestMatch, { shouldValidate: true });
        } else {
            toast({ variant: 'destructive', title: t('toast_location_not_found_title'), description: t('toast_location_not_found_description', { transcript }) });
        }
      } else if (field === 'name') {
        form.setValue(field, transcript, { shouldValidate: true });
      }
      setListeningField(null);
    };

    recognition.start();
  };


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          <span>{t('form_title_start_calculation')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" />{t('form_label_name')}</FormLabel>
                     <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder={t('form_placeholder_name')} {...field} />
                        </FormControl>
                         <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleVoiceInput('name')}
                            disabled={!!listeningField}
                            aria-label={t('form_aria_voice_name')}
                        >
                            <Mic className={listeningField === 'name' ? 'animate-pulse text-red-500' : ''}/>
                        </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><MapPin className="h-4 w-4" />{t('form_label_state')}</FormLabel>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder={t('form_placeholder_location')} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {STATES.map((loc) => (
                                <SelectItem key={loc.name} value={loc.name}>
                                    {loc.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleCurrentLocation}
                                disabled={isLocating}
                                aria-label={t('form_aria_current_location')}
                                className="w-full sm:w-10"
                            >
                                <LocateFixed className={isLocating ? 'animate-pulse' : ''}/>
                            </Button>
                             <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => handleVoiceInput('location')}
                                disabled={!!listeningField}
                                aria-label={t('form_aria_voice_location')}
                                className="w-full sm:w-10"
                            >
                                <Mic className={listeningField === 'location' ? 'animate-pulse text-red-500' : ''}/>
                            </Button>
                        </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Map className="h-4 w-4" />{t('form_label_district')}</FormLabel>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Select onValueChange={field.onChange} value={field.value} disabled={districts.length === 0}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder={t('form_placeholder_district')} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {districts.map((dist) => (
                                <SelectItem key={dist.name} value={dist.name}>
                                    {dist.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                             <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => handleVoiceInput('district')}
                                disabled={!!listeningField || districts.length === 0}
                                aria-label={t('form_aria_voice_district')}
                                className="w-full sm:w-10"
                            >
                                <Mic className={listeningField === 'district' ? 'animate-pulse text-red-500' : ''}/>
                            </Button>
                        </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="population"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Users className="h-4 w-4" />{t('form_label_population')}</FormLabel>
                     <div className="flex gap-2">
                        <FormControl>
                            <Input type="number" placeholder={t('form_placeholder_population')} {...field} />
                        </FormControl>
                         <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleVoiceInput('population')}
                            disabled={!!listeningField}
                            aria-label={t('form_aria_voice_population')}
                        >
                            <Mic className={listeningField === 'population' ? 'animate-pulse text-red-500' : ''}/>
                        </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="roofArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><MapPin className="h-4 w-4" />{t('form_label_roof_area')}</FormLabel>
                     <div className="flex gap-2">
                        <FormControl>
                          <Input type="number" placeholder={t('form_placeholder_roof_area')} {...field} />
                        </FormControl>
                         <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleVoiceInput('roofArea')}
                            disabled={!!listeningField}
                            aria-label={t('form_aria_voice_roof_area')}
                        >
                            <Mic className={listeningField === 'roofArea' ? 'animate-pulse text-red-500' : ''}/>
                        </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="openSpace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Layers className="h-4 w-4" />{t('form_label_open_space')}</FormLabel>
                     <div className="flex gap-2">
                        <FormControl>
                          <Input type="number" placeholder={t('form_placeholder_open_space')} {...field} />
                        </FormControl>
                         <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleVoiceInput('openSpace')}
                            disabled={!!listeningField}
                            aria-label={t('form_aria_voice_open_space')}
                        >
                            <Mic className={listeningField === 'openSpace' ? 'animate-pulse text-red-500' : ''}/>
                        </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isCalculating} className="w-full md:w-auto bg-accent hover:bg-accent/90">
              {isCalculating ? t('form_button_calculating') : t('form_button_calculate')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
