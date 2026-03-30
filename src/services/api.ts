// Centralised API service layer — all fetch calls go through these helpers
// so the rest of the app stays decoupled from the underlying endpoints.

export async function getData(resource: string): Promise<any> {
  try {
    const res = await fetch(`/api/${resource}`, { method: "GET" });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function addData(resource: string, formData: Record<string, unknown>): Promise<any> {
  try {
    const res = await fetch(`/api/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function updateData(resource: string, formData: Record<string, unknown>): Promise<any> {
  try {
    const res = await fetch(`/api/${resource}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function login(formData: Record<string, string>): Promise<any> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function register(formData: Record<string, string>): Promise<any> {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function deleteData(resource: string, id: string): Promise<any> {
  try {
    const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    return res.json();
  } catch (e) {
    console.error("Error deleting item", e);
    return { success: false, message: "Failed to delete item" };
  }
}
