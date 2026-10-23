/**
 * Sends proposal response via backend SMTP endpoint (/api/send-email)
 */
export async function sendProposalResponse({ answer = 'YES', evasionCount = 0 }) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answer,
        evasionCount
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error calling /api/send-email:', error);
    return { success: false, error: error.message };
  }
}
