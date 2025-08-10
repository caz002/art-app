const API_BASE = "http://localhost:5001";

export async function fetchPosts() {
    const res = await fetch(`${API_BASE}/api/posts`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }

    return await res.json();
}

export async function createPost(data: FormData) {
    const res = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        credentials: "include",
        body: data,
    });

    if (!res.ok) {
        throw new Error("Failed to create post");
    }

    return await res.json();
}
