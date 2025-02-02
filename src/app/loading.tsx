export default function Loading({className}:{className?:string}) {



    return (
      <div className={`flex justify-center ${className}`}>
          <span className={`loader`}></span>
      </div>
    );
  }