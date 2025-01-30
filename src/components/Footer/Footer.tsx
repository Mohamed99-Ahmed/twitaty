

export default function Footer() {
    return (
      <>
      {/* Footer contain some content about me */}
        <footer className=" py-6 bg-white  shadow-top" >
          <div className="container space-y-4 flex flex-col-reverse gap-2 items-center justify-center">
            <p>
               &copy; الحقوق محفوظة لدي محمد احمد 2024
            </p>
            <div className="socials text-lg flex gap-4 ">
              <a href="https://github.com/Mohamed99-Ahmed"  target="_blank">
                <i className="fa-brands fa-github text-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/eng-mohamed-ahmed/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
        </footer>
      </>
    )
  }
  