<template>
  <div class="container">
    <div class="terms-of-service">
      <div class="card p-4 text-white">
        <h1>Conditions d'utilisation</h1>
        <p>Bienvenue sur notre site. En utilisant notre application, vous acceptez les présentes conditions d'utilisation. Veuillez les lire attentivement.</p>
        <h2>1. Utilisation de l'application</h2>
        <p>L'application est destinée à fournir des recettes adaptées en fonction des allergies, intolérances et préférences alimentaires. Les informations générées sont à titre informatif uniquement et ne remplacent pas un avis médical ou professionnel.</p>
        <h2>2. Clause de non-responsabilité</h2>
        <p>Nous faisons de notre mieux pour fournir des informations précises et adaptées. Cependant, nous ne garantissons pas l'exactitude, l'exhaustivité ou la pertinence des recettes générées. Vous êtes responsable de vérifier les ingrédients et de consulter un professionnel de santé si vous avez des doutes.</p>
        <h2>3. Collecte et traitement des données</h2>
        <p>Pour personnaliser les recettes, nous collectons des informations telles que vos préférences alimentaires et vos intolérances. Ces données sont traitées conformément à notre <a href="/privacy-policy">Politique de confidentialité</a>. En utilisant l'application, vous consentez à ce traitement.</p>
        <h2>4. Propriété intellectuelle</h2>
        <p>Tout le contenu généré par l'application, y compris les recettes, est protégé par les lois sur la propriété intellectuelle. Vous pouvez utiliser ce contenu à des fins personnelles, mais toute redistribution, modification ou utilisation commerciale nécessite une autorisation préalable.</p>
        <h2>5. Utilisation des services tiers</h2>
        <p>Notre application utilise des services tiers, notamment OpenAI, pour générer du contenu. En utilisant l'application, vous acceptez que vos données puissent être partagées avec ces services conformément à leurs conditions d'utilisation et politiques de confidentialité.</p>
        <h2>6. Responsabilité de l'utilisateur</h2>
        <p>En utilisant l'application, vous acceptez de ne pas utiliser les services de manière illégale ou pour nuire à autrui. Vous êtes responsable de l'utilisation des recettes et des conséquences éventuelles.</p>
        <h2>7. Modifications des conditions d'utilisation</h2>
        <p>Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prendront effet dès leur publication sur cette page. Nous vous recommandons de consulter régulièrement cette page.</p>
        <h2>8. Contact</h2>
        <p>Si vous avez des questions ou préoccupations concernant ces conditions d'utilisation, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:cookaller@gmail.com">cookaller@gmail.com</a>.</p>
        <p>Merci d'utiliser notre application !</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsOfService",
};
</script>

<style scoped>
.terms-of-service {
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  text-align: left;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: left;
}
.card {
  background-color: #212121;
  border: none;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}
</style>
