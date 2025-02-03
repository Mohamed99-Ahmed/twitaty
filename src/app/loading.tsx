export default function Loading({className}:{className?:string}) {



    return (
      <div className={`flex justify-center ${className}`}>
        {/* loader mange in global css file */}
          <span className={`loader`}></span>
      </div>
    );
  }