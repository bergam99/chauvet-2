// interface CheckoutFormValues {
//   firstName: string;
//   lastName: string;
//   address: string;
//   zipcode: string;
//   city: string;
//   country: string;
//   tel: string;
// }

// interface FormValidationErrors {
//   [key: string]: string; // field name : entered value
// }

// export default function serverSideCheckoutFormValidation({
//   firstName,
//   lastName,
//   address,
//   zipcode,
//   city,
//   country,
//   tel,
// }: CheckoutFormValues): FormValidationErrors {
//   const fields: CheckoutFormValues = {
//     firstName,
//     lastName,
//     address,
//     zipcode,
//     city,
//     country,
//     tel,
//   };

//   const errors: FormValidationErrors = Object.entries(fields).reduce(
//     // transform fields into array of [field name, entered value]
//     (acc: FormValidationErrors, [key, value]: [string, string]) => {
//       if (!value || value.trim() === "") {
//         acc[key] = `Invalid ${key}.`;
//       }
//       return acc;
//     },
//     {}
//   );

//   return errors;
// }
