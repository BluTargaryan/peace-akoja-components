
import ComponentCard from "./components/atoms/ComponentCard";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-5 text-center w-72 mx-auto mb-20
      md:w-80 xl:w-[512px] xl:mb-40
      ">
        <h1>PEACE’S COMPONENT Playground</h1>
        <p>A collection of components created with Next.js and TailwindCSS.</p>
      </div>

      <section className="flex flex-col gap-10 ourMaxWidth items-center xl:gap-20">
<h2>Components</h2>

<ul className="grid grid-cols-1 gap-5 px-4 w-full
md:grid-cols-2 xl:grid-cols-3  
">
<li>
<ComponentCard componentId="1" />
</li>
<li>
<ComponentCard componentId="2" />
</li>
<li>
<ComponentCard componentId="3" />
</li>
</ul>
      </section>

    </main>
  );
}
