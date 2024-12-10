-- Insert traits for the existing profile
INSERT INTO traits_personnalite 
(profil_redacteur_id, trait, origine, description)
VALUES
('5ec345c6-b36e-4573-9b86-9efed2b016ae', 'Créatif', 'recommande', 'Idéal pour des contenus originaux et engageants, comme des histoires ou des publicités.'),
('5ec345c6-b36e-4573-9b86-9efed2b016ae', 'Empathique', 'recommande', 'Convient aux sujets sensibles, comme la santé ou le bien-être.');

-- Ces traits sont recommandés car le style d'écriture est "Narratif"
-- Voir STYLE_TRAIT_RECOMMENDATIONS dans le code TypeScript