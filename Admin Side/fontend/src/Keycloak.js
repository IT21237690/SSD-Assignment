// keycloak.js
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: 'http://localhost:8080/',
  realm: 'SSD',
  clientId: 'Web',
});

export default keycloak;
