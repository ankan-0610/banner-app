CREATE TABLE banner_db (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255),
  timer INT,
  link VARCHAR(255),
  visible BOOLEAN
);

INSERT INTO banner_db (description, timer, link, visible) VALUES ('Welcome to our website!', 60, 'https://example.com', true);