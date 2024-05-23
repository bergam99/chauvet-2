import * as Yup from "yup";

export const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("Le prénom est obligatoire")
    .min(2, "Le prénom doit comporter au moins 2 caractères"),
  lastName: Yup.string()
    .required("Le nom est obligatoire")
    .min(2, "Le nom doit comporter au moins 2 caractères"),
  address: Yup.string()
    .required("L'adresse est obligatoire")
    .min(5, "L'adresse doit comporter au moins 5 caractères"),
  zipcode: Yup.string()
    .required("Le code postal est obligatoire")
    .min(5, "Le code postal doit comporter au moins 5 caractères"),
  city: Yup.string()
    .required("La ville est obligatoire")
    .min(2, "La ville doit comporter au moins 2 caractères"),
  country: Yup.string()
    .required("Le pays est obligatoire")
    .min(2, "Le pays doit comporter au moins 2 caractères"),
  tel: Yup.string()
    .required("Le téléphone est obligatoire")
    .min(10, "Le téléphone doit comporter au moins 10 caractères"),
});
