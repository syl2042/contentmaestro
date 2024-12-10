export const PERSONALITY_TRAITS = {
  "Créatif": {
    description: "Idéal pour des contenus originaux et engageants, comme des histoires ou des publicités.",
    icon: "Sparkles"
  },
  "Empathique": {
    description: "Convient aux sujets sensibles, comme la santé ou le bien-être.",
    icon: "Heart"
  },
  "Rigoureux": {
    description: "Garantit des contenus précis et bien structurés.",
    icon: "CheckSquare"
  },
  "Analytique": {
    description: "Parfait pour des rapports détaillés ou des articles techniques.",
    icon: "BarChart"
  },
  "Audacieux": {
    description: "Excellent pour captiver une audience et explorer des idées innovantes.",
    icon: "Rocket"
  },
  "Stratégique": {
    description: "Utile pour des contenus orientés résultats, comme des plans d'action.",
    icon: "Target"
  },
  "Factuel": {
    description: "Adapté pour des contenus basés sur des faits et des données vérifiées.",
    icon: "ClipboardCheck"
  },
  "Pragmatique": {
    description: "Convient aux approches pratiques et réalistes.",
    icon: "Tool"
  },
  "Inspirant": {
    description: "Idéal pour motiver ou captiver une audience.",
    icon: "Star"
  }
} as const;

export const STYLE_TRAIT_RECOMMENDATIONS: Record<string, string[]> = {
  "Narratif": ["Créatif", "Empathique"],
  "Descriptif": ["Rigoureux", "Analytique"],
  "Analytique": ["Rigoureux", "Stratégique"],
  "Persuasif": ["Audacieux", "Stratégique"],
  "Humoristique": ["Créatif", "Audacieux"],
  "Poétique": ["Créatif", "Inspirant"],
  "Technique": ["Rigoureux", "Analytique"],
  "Factuel": ["Factuel", "Pragmatique"],
  "Inspirant": ["Créatif", "Audacieux"],
  "Critique": ["Analytique", "Stratégique"],
  "Satirique": ["Humoristique", "Audacieux"],
  "Publicitaire": ["Créatif", "Stratégique"]
};