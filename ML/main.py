import tensorflow as tf
import numpy as np
import os

# Dữ liệu ví dụ (tập huấn luyện cơ bản)
data = "function helloWorld() { console.log('Hello, World!'); } function greet(name) { return `Hello, ${name}!`; }"

# Xử lý dữ liệu thành dạng số
chars = sorted(set(data))
char2idx = {char: idx for idx, char in enumerate(chars)}
idx2char = {idx: char for idx, char in enumerate(chars)}

# Chuyển đổi văn bản thành chuỗi số
data_as_int = np.array([char2idx[c] for c in data])

# Tạo dữ liệu chuỗi
seq_length = 20
x_data = []
y_data = []

for i in range(len(data_as_int) - seq_length):
    x_data.append(data_as_int[i:i + seq_length])
    y_data.append(data_as_int[i + seq_length])

x_data = np.array(x_data)
y_data = np.array(y_data)

# Xây dựng mô hình RNN
vocab_size = len(chars)
embedding_dim = 256
rnn_units = 1024

model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, batch_input_shape=[None, seq_length]),
    tf.keras.layers.LSTM(rnn_units, return_sequences=True),
    tf.keras.layers.Dense(vocab_size)
])

# Hàm mất mát
def loss_fn(labels, logits):
    return tf.keras.losses.sparse_categorical_crossentropy(labels, logits, from_logits=True)

model.compile(optimizer='adam', loss=loss_fn)

# Huấn luyện
model.fit(x_data, y_data, epochs=10)

# Sinh văn bản
def generate_text(model, start_string, num_generate=100):
    input_eval = [char2idx[s] for s in start_string]
    input_eval = tf.expand_dims(input_eval, 0)
    text_generated = []

    for _ in range(num_generate):
        predictions = model(input_eval)
        predictions = tf.squeeze(predictions, 0)
        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1, 0].numpy()

        input_eval = tf.expand_dims([predicted_id], 0)
        text_generated.append(idx2char[predicted_id])

    return start_string + ''.join(text_generated)

print(generate_text(model, start_string="function "))
