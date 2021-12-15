import * as yup from 'yup'

const todoSchema = yup.object({
  content: yup.string().min(5).required(),
  userId: yup.number().required()
})

export default todoSchema