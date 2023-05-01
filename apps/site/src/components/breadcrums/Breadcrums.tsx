
interface Props {
  categories: (string[])
}

export const Breadcrumbs:React.FC<Props> = ({ categories }) => {

    return (
      <div className="flex py-2">
        {categories.map((category, i) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a key={i} className={ `text-sm text-zinc-500 ${i === categories.length-1 && 'font-medium px-1'}` }>{category}{i < categories.length-1 ? ' >' : ' '}</a>
        ))}
      </div>
    );
  }
  
  export default Breadcrumbs;