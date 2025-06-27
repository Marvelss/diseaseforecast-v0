// 统一API请求工具
export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }
  return response.json();
}

// 文件上传专用
export async function uploadFile(url: string, file: File): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }
  return response.json();
} 