import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChildText, PostContent } from "@/types/blog/post";
import { genID } from "@/lib/utils";

interface RichTextRendererProps {
  content: PostContent[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const renderText = (text: ChildText) => {
    if (!text) return <span />;
    return (
      <span
        className={`
          ${text.bold ? "font-bold" : ""}
          ${text.italic ? "italic" : ""}
          ${text.underline ? "underline" : ""}
          ${text.strikethrough ? "line-through" : ""}
          ${text.code ? "rounded bg-gray-100 px-1 font-mono" : ""}
        `}
      >
        {text.text}
      </span>
    );
  };

  const renderBlock = (block: PostContent, index: string) => {
    switch (block.type) {
      case "h1":
        return (
          <h1 key={index} className="my-4 text-4xl font-bold">
            {block.children.map(renderText)}
          </h1>
        );
      case "h2":
        return (
          <h2 key={index} className="my-3 text-3xl font-bold">
            {block.children.map(renderText)}
          </h2>
        );
      case "h3":
        return (
          <h3 key={index} className="my-3 text-2xl font-bold">
            {block.children.map(renderText)}
          </h3>
        );
      case "h4":
        return (
          <h4 key={index} className="my-2 text-xl font-bold">
            {block.children.map(renderText)}
          </h4>
        );
      case "h5":
        return (
          <h5 key={index} className="my-2 text-lg font-bold">
            {block.children.map(renderText)}
          </h5>
        );
      case "h6":
        return (
          <h6 key={index} className="my-2 text-base font-bold">
            {block.children.map(renderText)}
          </h6>
        );
      case "paragraph":
        return (
          <p key={index} className="my-2">
            {block.children.map(renderText)}
          </p>
        );
      case "ul":
        return (
          <ul key={index} className="my-4 list-disc pl-6">
            {block.children.map((child, childIndex) => {
              return (
                <li key={genID()}>
                  {renderText(
                    // @ts-ignore
                    child.children?.[0].children?.[0] || child.children?.[0],
                  )}
                </li>
              );
            })}
          </ul>
        );
      case "ol":
        return (
          <ol key={index} className="my-4 list-decimal pl-6">
            {block.children.map((child, childIndex) => {
              return (
                <li key={genID()}>
                  {/* @ts-ignore  */}
                  {renderText(child.children?.[0].children?.[0])}
                </li>
              );
            })}
          </ol>
        );
      case "li":
        return <li key={index}>{block.children.map(renderText)}</li>;
      case "link":
        return (
          <Link
            key={index}
            href={block.url || "#"}
            className="text-blue-600 hover:underline"
          >
            {block.children.map(renderText)}
          </Link>
        );
      case "upload":
        if (block.value) {
          return (
            <Image
              key={index}
              src={block.value.url}
              alt={block.value.alt || ""}
              width={block.value.width}
              height={block.value.height}
              quality={100}
              loading="lazy"
              className="my-4 h-[300px] w-full rounded-lg object-cover"
            />
          );
        }
        return null;
      case "blockquote":
        return (
          <blockquote
            key={index}
            className="my-4 border-l-4 border-gray-300 pl-4 italic"
          >
            {block.children.map(renderText)}
          </blockquote>
        );
      case "indent":
        return (
          <div key={index} className="my-2 pl-6">
            {block.children.map(renderText)}
          </div>
        );
      case "code":
        return (
          <pre
            key={index}
            className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4"
          >
            <code>{block.children.map(renderText)}</code>
          </pre>
        );
      default:
        return (
          <p key={index} className="my-2">
            {block.children.map(renderText)}
          </p>
        );
    }
  };

  return (
    <div className="rich-text-content w-full">
      {content.map((block, index) => renderBlock(block, genID()))}
    </div>
  );
};

export default RichTextRenderer;
