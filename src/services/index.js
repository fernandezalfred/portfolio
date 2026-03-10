// Centralised API service layer — all fetch calls go through these helpers
// so the rest of the app stays decoupled from the underlying endpoints.

// POST /api/<currentTab>/add
export async function addData(currentTab,formData){
    try {
        const response = await fetch(`/api/${currentTab}/add`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
 
        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);      
    } 
}

// GET /api/<currentTab>/get
export async function getData(currentTab){
    try {
        const response = await fetch(`/api/${currentTab}/get`,{
            method: "GET"
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}

// PUT /api/<currentTab>/update
export async function updateData(currentTab,formData){
    try {
        const response = await fetch(`/api/${currentTab}/update`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    } 
}

// POST /api/login — authenticates the admin user
export async function login(formData){
    try {
        const response = await fetch(`/api/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    } 
}

// POST /api/register — creates a new admin account
export async function register(formData){
    try {
        const response = await fetch(`/api/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}

// DELETE /api/education/delete — removes an education entry by id
export async function handleDelete(id) {
    try {
        const res = await fetch(`/api/education/delete`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id})
        });

        return res.json();
        
    } catch (e) {
        console.error("Error Deleting items",e);
        return { success: false, message: "Failed to delete item"};
    }
}

