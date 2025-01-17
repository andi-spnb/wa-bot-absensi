const axios = require('axios');

async function testNotification() {
  try {
    const response = await axios.post('http://localhost:3000/api/send', {
      type: 'keterlambatan',
      phone: '62888705966759', 
      data: {
        nama: 'John Doe',
        waktu: '08:30'
      }
    }, {
      headers: {
        'X-API-Key': '3c0d818fb0bbf65a187d0372b25ca827538ac0e2355de736db97e33943df7a13'
      }
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testNotification();

curl -X POST http://localhost:3000/api/send \
-H "X-API-Key: " \
-H "Content-Type: application/json" \
-d '{
  "type": "keterlambatan",
  "phone": "your_phone_number",
  "data": {
    "nama": "John Doe",
    "waktu": "08:30"
  }
}'