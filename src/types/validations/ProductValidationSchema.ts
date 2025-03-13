import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(128, 'Name cannot exceed 128 characters'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .typeError('Price must be a number'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be an integer')
    .typeError('Quantity must be a number'),
});

export default productValidationSchema;
