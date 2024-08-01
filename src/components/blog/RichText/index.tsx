import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ChildText, PostContent } from '@/types/blog/post';

interface RichTextRendererProps {
    content: PostContent[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
    const renderText = (text: ChildText) => {
        return (
            <span
                className={`
          ${text.bold ? 'font-bold' : ''}
          ${text.italic ? 'italic' : ''}
          ${text.underline ? 'underline' : ''}
          ${text.strikethrough ? 'line-through' : ''}
          ${text.code ? 'font-mono bg-gray-100 rounded px-1' : ''}
        `}
            >
                {text.text}
            </span>
        );
    };

    const renderBlock = (block: PostContent, index: number) => {
        switch (block.type) {
            case 'h1':
                return <h1 key={index} className="text-4xl font-bold my-4">{block.children.map(renderText)}</h1>;
            case 'h2':
                return <h2 key={index} className="text-3xl font-bold my-3">{block.children.map(renderText)}</h2>;
            case 'h3':
                return <h3 key={index} className="text-2xl font-bold my-3">{block.children.map(renderText)}</h3>;
            case 'h4':
                return <h4 key={index} className="text-xl font-bold my-2">{block.children.map(renderText)}</h4>;
            case 'h5':
                return <h5 key={index} className="text-lg font-bold my-2">{block.children.map(renderText)}</h5>;
            case 'h6':
                return <h6 key={index} className="text-base font-bold my-2">{block.children.map(renderText)}</h6>;
            case 'paragraph':
                return <p key={index} className="my-2">{block.children.map(renderText)}</p>;
            case 'ul':
                return (
                    <ul key={index} className="list-disc pl-6 my-4">
                        {block.children.map((child, childIndex) => (
                            <li key={childIndex}>{renderText(child)}</li>
                        ))}
                    </ul>
                );
            case 'ol':
                return (
                    <ol key={index} className="list-decimal pl-6 my-4">
                        {block.children.map((child, childIndex) => (
                            <li key={childIndex}>{renderText(child)}</li>
                        ))}
                    </ol>
                );
            case 'li':
                return <li key={index}>{block.children.map(renderText)}</li>;
            case 'link':
                return (
                    <Link key={index} href={block.url || '#'} className="text-blue-600 hover:underline">
                        {block.children.map(renderText)}
                    </Link>
                );
            case 'upload':
                if (block.value) {
                    return (
                        <Image
                            key={index}
                            src={block.value.url}
                            alt={block.value.alt || ""}
                            width={block.value.width}
                            height={block.value.height}
                            className="my-4 rounded-lg"
                        />
                    );
                }
                return null;
            case 'blockquote':
                return (
                    <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
                        {block.children.map(renderText)}
                    </blockquote>
                );
            case 'indent':
                return (
                    <div key={index} className="pl-6 my-2">
                        {block.children.map(renderText)}
                    </div>
                );
            case 'code':
                return (
                    <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                        <code>{block.children.map(renderText)}</code>
                    </pre>
                );
            default:
                return <p key={index} className="my-2">{block.children.map(renderText)}</p>;
        }
    };

    return (
        <div className="rich-text-content w-full">
            {content.map((block, index) => renderBlock(block, index))}
        </div>
    );
};

export default RichTextRenderer;