// import Todo from "../models/Todo";

// // const API_BASE_URL = 'https://task-master-x4xs.onrender.com/api';
// // const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:5000/api';
// const API_BASE_URL = 'http://localhost:5000/api';

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   const headers: Record<string, string> = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   };

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   return headers;
// };

// export const todoApi = {
//   async getTodos(): Promise<Todo[]> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/todos`, {
//         headers: {
//           ...getAuthHeaders(),
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       return Array.isArray(data) ? data : [];
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//       throw new Error('Failed to fetch todos');
//     }
//   },

//   async createTodo(body: string): Promise<Todo> {
//     try {
//       const userStr = localStorage.getItem('user');
//       let userId = undefined;
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         userId = user._id || user.id;
//       }
//       const response = await fetch(`${API_BASE_URL}/todos`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...getAuthHeaders(),
//         },
//         body: JSON.stringify({ body, completed: false, important: false, userId }),
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(errorData || `HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error creating todo:', error);
//       throw new Error('Failed to create todo');
//     }
//   },

//   async toggleTodo(id: string, completed: boolean): Promise<void> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           ...getAuthHeaders(),
//         },
//         body: JSON.stringify({ completed }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error updating todo:', error);
//       throw new Error('Failed to update todo');
//     }
//   },

//   async toggleImportant(id: string, important: boolean): Promise<void> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/todos/${id}/important`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           ...getAuthHeaders(),
//         },
//         body: JSON.stringify({ important }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error updating todo importance:', error);
//       throw new Error('Failed to update todo importance');
//     }
//   },

//   async deleteTodo(id: string): Promise<void> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
//         method: 'DELETE',
//         headers: {
//           ...getAuthHeaders(),
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//       throw new Error('Failed to delete todo');
//     }
//   },

//   async signup(name: string, email: string, password: string): Promise<{ token: string }> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ full_name: name, email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(errorData || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//       }
//       // Store user info (try to get _id from response if available)
//       localStorage.setItem('user', JSON.stringify({
//         email,
//         name,
//         _id: data._id || undefined
//       }));
//       return data;
//     } catch (error) {
//       console.error('Error during signup:', error);
//       throw error;
//     }
//   },

//   async login(email: string, password: string): Promise<{ token: string }> {
//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(errorData || `HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//       }
//       // Store user info (try to get _id from response if available)
//       localStorage.setItem('user', JSON.stringify({
//         email,
//         name: data.full_name || undefined,
//         _id: data._id || undefined
//       }));
//       return data;
//     } catch (error) {
//       console.error('Error during login:', error);
//       throw error;
//     }
//   },
// };


























import Todo from "../models/Todo";

// Use environment variable or fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const todoApi = {
  async getTodos(): Promise<Todo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        headers: getAuthHeaders(),
      });
      
      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw new Error('Failed to fetch todos');
    }
  },

  async createTodo(body: string): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ body, completed: false, important: false }),
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new Error('Failed to create todo');
    }
  },

  async toggleTodo(id: string, completed: boolean): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ completed }),
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      throw new Error('Failed to update todo');
    }
  },

  async toggleImportant(id: string, important: boolean): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}/important`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ important }),
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating todo importance:', error);
      throw new Error('Failed to update todo importance');
    }
  },

  async deleteTodo(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw new Error('Failed to delete todo');
    }
  },

  async signup(name: string, email: string, password: string): Promise<{ token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ full_name: name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  async login(email: string, password: string): Promise<{ token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Decode JWT payload (without verification for client-side check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < exp;
    } catch {
      return false;
    }
  },

  // Logout function
  logout(): void {
    localStorage.removeItem('token');
    // Only redirect if not already on login/signup pages
    if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
      window.location.href = '/login';
    }
  }
};