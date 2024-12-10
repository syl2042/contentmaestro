import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StepIndicator } from './StepIndicator';
import { GeneralInfo } from './steps/GeneralInfo';
import { StyleAndTone } from './steps/StyleAndTone';
import { Personality } from './steps/Personality/index';
import { AdvancedSettings } from './steps/AdvancedSettings';
import { useProfiles } from '@/hooks/useProfiles';
import { useAuth } from '@/contexts/AuthContext';
import type { WriterProfile } from '@/types/profile';

interface ProfileWizardProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: WriterProfile | null;
  onProfileCreated?: () => void;
}

const steps = [
  { title: 'Informations Générales', component: GeneralInfo },
  { title: 'Style et Ton', component: StyleAndTone },
  { title: 'Traits de Personnalité', component: Personality },
  { title: 'Paramètres Avancés', component: AdvancedSettings },
];

export function ProfileWizard({ isOpen, onClose, profile, onProfileCreated }: ProfileWizardProps) {
  const { user } = useAuth();
  const { createProfile, updateProfile } = useProfiles(user?.id);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<WriterProfile>>({
    traits_personnalite: [],
    parametres_seo: {
      densite_mots_cles: 2,
      meta_descriptions: true
    }
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setFormData(profile || {
        traits_personnalite: [],
        parametres_seo: {
          densite_mots_cles: 2,
          meta_descriptions: true
        }
      });
      setError(null);
    }
  }, [isOpen, profile]);

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateFormData = (data: Partial<WriterProfile>): void => {
    if (!user?.id) throw new Error('Utilisateur non connecté');
    if (!data.nom_profil) throw new Error('Le nom du profil est requis');
    if (!data.specialite_thematique) throw new Error('La spécialité thématique est requise');
    if (!data.style_ecriture) throw new Error('Le style d\'écriture est requis');
    if (!data.ton) throw new Error('Le ton est requis');
    if (!data.niveau_langage) throw new Error('Le niveau de langage est requis');
    if (!data.traits_personnalite?.length) throw new Error('Au moins un trait de personnalité est requis');
    if (!data.parametres_seo) throw new Error('Les paramètres SEO sont requis');
  };

  const handleStepComplete = async (stepData: Partial<WriterProfile>) => {
    try {
      setError(null);
      const updatedData = { ...formData, ...stepData };
      setFormData(updatedData);

      if (currentStep === steps.length - 1) {
        validateFormData(updatedData);

        const profileData = {
          ...updatedData,
          user_id: user!.id,
          traits_personnalite: updatedData.traits_personnalite || [],
          parametres_seo: {
            densite_mots_cles: updatedData.parametres_seo?.densite_mots_cles || 2,
            meta_descriptions: updatedData.parametres_seo?.meta_descriptions ?? true
          }
        };

        if (profile?.id) {
          await updateProfile(profile.id, profileData);
        } else {
          await createProfile(profileData as Omit<WriterProfile, 'id'>);
        }

        onClose();
        setFormData({
          traits_personnalite: [],
          parametres_seo: {
            densite_mots_cles: 2,
            meta_descriptions: true
          }
        });
        if (onProfileCreated) {
          onProfileCreated();
        }
      } else {
        handleNext();
      }
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {profile ? 'Modifier le Profil' : 'Créer un Nouveau Profil'}
          </DialogTitle>
          {error && (
            <p className="text-sm text-[rgb(var(--color-error))] mt-2">{error}</p>
          )}
        </DialogHeader>

        <StepIndicator
          steps={steps.map(s => s.title)}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        <CurrentStepComponent
          data={formData}
          onComplete={handleStepComplete}
          onPrevious={handlePrevious}
          isLastStep={currentStep === steps.length - 1}
        />
      </DialogContent>
    </Dialog>
  );
}