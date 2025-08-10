const API_BASE = "http://localhost:5001";

export async function register(email: string, name: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
    }

    return await res.json();
}

export async function login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
    }

    return await res.json();
}

export async function logout() {
    const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Logout failed");
    }
}
