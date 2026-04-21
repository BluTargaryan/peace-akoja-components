
import ComponentCard from "./components/atoms/ComponentCard";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-5 text-center w-72 mb-20">
        <h1>PEACE’S COMPONENT Playground</h1>
        <p>A collection of components created with Next.js and TailwindCSS.</p>
      </div>

      <section className="flex flex-col gap-10 w-full items-center">
<h2>Components</h2>

<ul className="grid grid-cols-1 gap-5 px-4 w-full">
<li>
<ComponentCard />
</li>
<li>
<ComponentCard />
</li>
<li>
<ComponentCard />
</li>
</ul>
      </section>

    </main>
  );
}
