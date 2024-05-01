export const CustomPrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <button className={`${className} custom-prev-arrow`} onClick={onClick} style={{background:"#EB5017"}}>
        Prev
      </button>
    );
  };
  
  export const CustomNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <button className={`${className} custom-next-arrow`} onClick={onClick} style={{background:"#EB5017"}}>
        Next
      </button>
    );
  };
  