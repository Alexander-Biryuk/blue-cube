import MyButton from './MyButton'
import styles from './MyPagination.module.scss'

type PropType = {
  numberOfPages: number,
  page: number,
  setPage: (value: React.SetStateAction<number>) => void;
}

export default function MyPagination2({numberOfPages, page, setPage}: PropType) {
  const buttons = [
  <MyButton number={'<'} setPage={setPage}/>,
  <MyButton number={page-1} setPage={setPage}/>,
  <MyButton number={page} setPage={setPage}/>,
  <MyButton number={'...'} setPage={setPage}/>,
  <MyButton number={numberOfPages - 1} setPage={setPage}/>,
  <MyButton number={numberOfPages} setPage={setPage}/>,
  <MyButton number={'>'} setPage={setPage}/>,
]
  return (
    <div className={styles.container}>
      {buttons.map(item => item)}
    </div>
  )
}