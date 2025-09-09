import Todo from "../models/Todo";

// Use environment variable or fallback to localhost for development
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL = 'https://task-master-x4xs.onrender.com/api';

console.log(API_BASE_URL);

const getAuthHeaders = (): Record<string, string> => {
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
  async getTodos(): Promise<Todo[]>  {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        headers: getAuthHeaders(),
      });
      
      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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

  async createTodo(body: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ body, completed: false, important: false }),
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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

  async toggleTodo(id: string, completed: boolean) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ completed }),
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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

  async toggleImportant(id: string, important: boolean) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}/important`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ important }),
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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

  async deleteTodo(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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

  async signup(name: string, email: string, password: string) {
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
      console.log('Signup response:', data); // Debug log
      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Store user data for sidebar display - handle multiple response formats
      const userData = {
        full_name: data.user?.full_name || data.full_name || data.name || name,
        email: data.user?.email || data.email || email,
      };
      console.log('Storing user data:', userData); // Debug log
      localStorage.setItem('user', JSON.stringify(userData));
      
      return data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
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
      console.log('Login response:', data); // Debug log
      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Store user data for sidebar display - handle multiple response formats
      const userData = {
        full_name: data.user?.full_name || data.full_name || data.name || 'User',
        email: data.user?.email || data.email || email,
      };
      console.log('Storing user data:', userData); // Debug log
      localStorage.setItem('user', JSON.stringify(userData));
      
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Get stored user data
  getUserData() {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Get user initials for avatar
  getUserInitials() {
    const userData = this.getUserData();
    if (!userData || !userData.full_name) return 'U';
    
    return userData.full_name
      .split(' ')
      .map((name: string) => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  },

  // Improved authentication check
  isAuthenticated() {
    const token = localStorage.getItem('token');
    
    // If no token exists, user is not authenticated
    if (!token) {
      console.log('No token found');
      return false;
    }
    
    try {
      // Split the token and check if it has the right format
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.log('Invalid token format');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }

      // Decode JWT payload (without verification for client-side check)
      const payload = JSON.parse(atob(tokenParts[1]));
      
      // Check if token has expiration
      if (!payload.exp) {
        console.log('Token missing expiration');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }

      const exp = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      
      // Add some buffer time (5 minutes) to account for clock skew
      const buffer = 5 * 60 * 1000;
      const isValid = now < (exp - buffer);
      
      if (!isValid) {
        console.log('Token expired');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }

      console.log('Token is valid');
      return true;
    } catch (error) {
      console.error('Error checking token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  },

  // Enhanced logout function
  logout() {
    console.log('Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Only redirect if not already on landing/login/signup pages
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/login') && 
        !currentPath.includes('/signup') && 
        currentPath !== '/') {
      window.location.href = '/';
    }
  },

  // Add a method to clear all auth data (for debugging)
  clearAuthData() {
    console.log('Clearing all authentication data');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
};