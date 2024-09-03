import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Home.module.css'
import { useState } from 'react'

interface IFormState {
  name: string
  email: string
}

function Home() {
  const { register, handleSubmit, reset } = useForm<IFormState>()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    setIsLoading(true)
    fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((responce) => responce.json())
      .then((data) => {
        if (!data) return
        setIsSuccess(true)
        reset()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Форма отправлена!</div>
        ) : (
          <>
            <h1>GTA - 6 Оставь заявку</h1>
            <input
              type="name"
              placeholder="Введите Имя:"
              {...register('name')}
            />
            <input
              type="email"
              placeholder="Введите Email:"
              {...register('email')}
            />
            <button disabled={isLoading}>{isLoading ? "Загрузка... ": "Хочу ГТА!"}</button>
          </>
        )}
      </form>
    </div>
  )
}
export default Home
