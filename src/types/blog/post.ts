export interface Author {
    id: string;
    name: string;
    roles: string[];
    email: string;
    createdAt: string;
    updatedAt: string;
    loginAttempts: number;
}

interface Image {
    id: string;
    alt: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    focalX: number;
    focalY: number;
    createdAt: string;
    updatedAt: string;
    url: string;
}

interface ChildText {
    text: string;
    bold?: boolean;
}

export interface PostContent {
    children: ChildText[];
    relationTo?: string;
    type?: string;
    value?: Image;
}

export interface RelatedPost {
    id: string;
    title: string;
    postContent?: PostContent[];
    image: Image;
    categories: string;
    publishedAt: string;
    authors: Author[];
    relatedPosts?: RelatedPost[];
    slug: string;
    meta: Meta;
    _status: string;
    createdAt: string;
    updatedAt: string;
    populatedAuthors: any[];
    readTime: string;
}

interface Meta {
    title?: string;
    description?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    postContent?: PostContent[];
    image: Image;
    categories: string;
    publishedAt: string;
    authors: Author[];
    relatedPosts?: RelatedPost[];
    slug: string;
    meta: Meta;
    _status: string;
    createdAt: string;
    updatedAt: string;
    readTime: string;
    populatedAuthors: any[];
}

export interface BlogPostsResponse {
    docs: BlogPost[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}
