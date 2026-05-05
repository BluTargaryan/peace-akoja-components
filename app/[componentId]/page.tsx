import Button from "../components/atoms/Button";
import { MdOutlineArrowBack } from "react-icons/md";
import CodeToggle from "../components/atoms/CodeToggle";
import Link from "next/link";
import { notFound } from "next/navigation";
import { componentList } from "../data/componentList";

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ componentId: string }>;
}) {
  const { componentId } = await params;
  const entry = componentList.find((c) => c.id === componentId);
  if (!entry) notFound();

  return (
    <main>
      <div className="ourMaxWidth mb-20">
        <Link href="/" as="/">
          <Button
            content={
              <>
                <MdOutlineArrowBack className="text-text group-hover:text-accent transition-all duration-300" />{" "}
                <span>Back</span>
              </>
            }
            className="pb-1 border-2 border-t-0 border-l-0 border-r-0 gap-4
      hover:text-accent hover:border-accent hover:bg-transparent  group
      "
          />
        </Link>
      </div>

      <h1 className="mb-10 ourMaxWidth xl:mb-20">{entry.name}</h1>

      <div className="ourMaxWidth flex flex-col gap-5 xl:gap-10">
        <div className="w-full py-20 flex items-center justify-center border-2 border-text xl:h-100">
          {entry.preview()}
        </div>

        <CodeToggle code={entry.code} usageExample={entry.usageExample} cssSnippet={entry.cssSnippet} />

        <div className="flex flex-col gap-5">{entry.description}</div>
      </div>
    </main>
  );
}
