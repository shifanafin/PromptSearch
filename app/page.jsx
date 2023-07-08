import Feed from "@components/Feed"

const Home = () => {
  return (
  <section className="w-full flex-center flex-col">
<h1 className="head_text text-center red_gradient">
    Discover & Share
    
    <br className="max-md:hidden"/>
    <span className="flex-center red_gradient">
        AI  Prompts
    </span>
    </h1>
    <p className="desc text-center">
        EasyPrompt is a Easy Propmpting tool, Where You can find and use 
        to deiscover the new world
        <span className="red_gradient">.....</span>
    </p>
    <Feed/>
  </section>
  )
}

export default Home
