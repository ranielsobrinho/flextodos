import * as yup from 'yup'

const todoSchema = yup.object({
  content: yup.string().min(5).required(),
  userId: yup.number().min(1).max(1).required()
})

export default todoSchema