// import { useFormik } from "formik";
// import { tournamentSchema, TournamentSchemaType } from "@/utils/formSchema";

// interface TournamentFormValues {
//     tournamentName: string;
//     game: string;
//     date: Date;
//     entreeFee: number;
//     prizePool: number;
//     format: string;
//     slots: number;
//     description: string;
//     image: File | null; // Ensures the image field is properly typed
//   }
  

// const useTournamentForm = () => {
//   const formik = useFormik<TournamentFormValues>({
//     initialValues: {
//       tournamentName: "",
//       game: "",
//       date: new Date(),
//       entreeFee: 0,
//       prizePool: 0,
//       format: "",
//       slots: 0,
//       description: "",
//       image:null as File | null
//     },
//     validationSchema: tournamentSchema,
//     onSubmit: (values: TournamentSchemaType) => {
//         console.log("Tournament Created:", values);
//         // Handle API call or further processing here
//       },
//   });

//   return formik;
// };

// export default useTournamentForm;
