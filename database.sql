SELECT rolname FROM pg_roles;
SELECT * FROM pg_roles;

-- Create database
CREATE DATABASE comenspu_database;

-- Use database
USE comenspu_database;

-- Create [Users] Table
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT KEY,
	studentID INT NOT NULL,
	role VARCHAR(255) NOT NULL,
	fname VARCHAR(255) NOT NULL,
	lname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	status VARCHAR(10) NOT NULL DEFAULT 'Waiting'
);

SELECT * FROM users;

ALTER TABLE users
ALTER COLUMN status SET DEFAULT 'Waiting';

INSERT INTO users (studentID, role, fname, lname, email, password)
VALUES('
INSERT INTO users (studentID, role, fname, lname, email, password)
VALUES('99999', 'admin', 'Admin', '#2', 'comen.spu1@gmail.com', '$2a$12$31HwWCI9EVVTWfAcTEFwt.o2Crs1V4tlA496dzvn.QUL43V2MXFqG');
', 'admin', 'Admin', '#2', 'comen.spu1@gmail.com', '$2a$12$31HwWCI9EVVTWfAcTEFwt.o2Crs1V4tlA496dzvn.QUL43V2MXFqG');

DELETE FROM users;

------------------------------- Header [Info] --------------------------------------
-- Create [Info-Header] Table
CREATE TABLE info_header (
	id INT NOT NULL AUTO_INCREMENT KEY,
	title_th VARCHAR(255) NOT NULL,
	title_en VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	link_scholarship VARCHAR(255) NOT NULL,
	link_apply_to_study VARCHAR(255) NOT NULL
);

SELECT * FROM info_header
INSERT INTO info_header (title_th, title_en, description, link_scholarship, link_apply_to_study)
VALUES('วิศวกรรมคอมพิวเตอร์', 'computer engineering', 'วีไอพีติวเตอร์ เรตล็อบบี้ติ๋มโบว์ซีน เซอร์ไพรส์อันตรกิริยาเก๋ากี้ คันถธุระ มินต์ คลาสสิกเอ็นทรานซ์รามเทพบ๊อบโบว์ลิ่ง', 'https://www.google.com/', 'https://www.youtube.com/')

------------------------------- Highlight [Info] --------------------------------------
-- Create [Info-Highlight] Table
CREATE TABLE info_highlight (
	id INT NOT NULL AUTO_INCREMENT KEY,
	topic VARCHAR(255) NOT NULL,
	description TEXT NOT NULL
);

SELECT * FROM info_highlight
INSERT INTO info_highlight (topic, description)
VALUES ('โดมิโน ยอมรับคาสิโนไฮบริด ชะโนดอพาร์ตเมนท์ เทรนด์ป่', 'นาเมนท์แฟ็กซ์ แจ็กพ็อต วิลล์ม้านั่ง กีวีภคันทลาพาธรากหญ้า ไฮกุพุทธภูมิโกะโค้กโอเปร่า ธุรกรรมติวเตอร์หมิง โพลล์ ครัวซองโพล');

------------------------------- Showcase(Images) --------------------------------------
-- Create [Info-Showcase] Table
CREATE TABLE  info_showcase (
	id INT NOT NULL AUTO_INCREMENT KEY,
	topic VARCHAR(255) NOT NULL,
	description TEXT NOT NULL
);

SELECT * FROM info_showcase
INSERT INTO info_showcase (topic, description)
VALUES ('Showcase (Images)', 'ป๊อปธุหร่ำชินบัญชรแอปเปิ้ล คอนเฟิร์มเบบี้ป๊อปรัมยูวี วาไรตี้ไฮแจ็ค เฮอร์ริเคนคอนโทรลมัฟฟิน');

-- Create [Showcase(Image)] Table
CREATE TABLE stuShowcase (
	id INT NOT NULL AUTO_INCREMENT KEY,
	studentID INT NOT NULL,
	topic VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	image_data BLOB NOT NULL,
	image_mime_type VARCHAR(100) NOT NULL,
	image VARCHAR(255) NOT NULL,
	status VARCHAR(10) NOT NULL DEFAULT 'Waiting',
	select VARCHAR(20) NOT NULL DEFAULT 'nonSelect'
);

SELECT * FROM stuShowcase
ALTER TABLE stuShowcase
ALTER COLUMN status SET DEFAULT 'Waiting';

------------------------------- Showcase(Tiktok) --------------------------------------
-- Create [Info-Showcase (Tiktok)] Table
CREATE TABLE  info_showTiktok (
	id INT NOT NULL AUTO_INCREMENT KEY,
	topic VARCHAR(255) NOT NULL,
	description TEXT NOT NULL
);

SELECT * FROM info_showTiktok
INSERT INTO info_showTiktok (topic, description)
VALUES ('Showcase (Tiktok)', 'ป๊อปธุหร่ำชินบัญชรแอปเปิ้ล คอนเฟิร์มเบบี้ป๊อปรัมยูวี วาไรตี้ไฮแจ็ค เฮอร์ริเคนคอนโทรลมัฟฟิน');

-- Create [Showcase(Tiktok)] Table
CREATE TABLE stuShowTiktok (
	id INT NOT NULL AUTO_INCREMENT KEY,
	studentID INT NOT NULL,
	topic VARCHAR(255) NOT NULL,
	embed TEXT NOT NULL,
	status VARCHAR(10) NOT NULL DEFAULT 'Waiting'
	select VARCHAR(20) NOT NULL DEFAULT 'nonSelect'
);

SELECT * FROM stuShowTiktok

------------------------------- OurTeam --------------------------------------
-- Create [Info-OurTeam] Table
CREATE TABLE  info_ourTeam (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	topic VARCHAR(255) NOT NULL,
	description TEXT NOT NULL
);

SELECT * FROM info_ourTeam
INSERT INTO info_ourTeam (topic, description)
VALUES ('Our Team', 'เพรสโหงววอล์ก เกมส์คอนเทนเนอร์พล็อตท็อปบู๊ท แฟนตาซีสปิริตฟลุตเซลส์ชนะเลิศ');

-- Create [OurTeam] Table
CREATE TABLE ourTeam (
	id INT NOT NULL AUTO_INCREMENT KEY,
	position VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	tel VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	website VARCHAR(255) NOT NULL,
	education TEXT NOT NULL,
	expertise TEXT NOT NULL,
	expLocation TEXT NOT NULL,	
	expPosition TEXT NOT NULL,
	research TEXT NOT NULL,
	image_data LONGBLOB NOT NULL,
	image_mime_type VARCHAR(100) NOT NULL,
	image VARCHAR(255) NOT NULL
);

SELECT * FROM ourTeam

ALTER TABLE ourTeam
MODIFY COLUMN image_data LONGBLOB;

------------------------------- Tools --------------------------------------
-- Create [Tools] Table
CREATE TABLE tools (
	id INT NOT NULL AUTO_INCREMENT KEY,
	name VARCHAR(255) NOT NULL,
	toolCode VARCHAR(10) NOT NULL,
	description VARCHAR(255) NOT NULL,
	quantity INT NOT NULL,
	available INT NOT NULL,
	img1_data LONGBLOB NOT NULL,
	img1_type VARCHAR(100) NOT NULL,
	img2_data LONGBLOB NOT NULL,
	img2_type VARCHAR(100) NOT NULL,
	img3_data LONGBLOB NOT NULL,
	img3_type VARCHAR(100) NOT NULL,
	img4_data LONGBLOB NOT NULL,
	img4_type VARCHAR(100) NOT NULL
);

SELECT * FROM tools;
ALTER TABLE tools
ADD COLUMN toolCode VARCHAR(10) NOT NULL;

ALTER TABLE tools
MODIFY COLUMN img1_data LONGBLOB,
MODIFY COLUMN img2_data LONGBLOB,
MODIFY COLUMN img3_data LONGBLOB,
MODIFY COLUMN img4_data LONGBLOB;

-- Create [Tools-Borrow-History] Table
CREATE TABLE toolsBorrowHistory (
	id INT NOT NULL AUTO_INCREMENT KEY,
	studentID INT NOT NULL,
	toolCode VARCHAR(10) NOT NULL,
	borrowCode VARCHAR(255) NOT NULL,
	borrowDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	toolName VARCHAR(255) NOT NULL,
	quantity INT NOT NULL,
	img1_data BLOB NOT NULL,
	img1_type VARCHAR(100) NOT NULL,
	img2_data BLOB NOT NULL,
	img2_type VARCHAR(100) NOT NULL,
	img3_data BLOB NOT NULL,
	img3_type VARCHAR(100) NOT NULL,
	img4_data BLOB NOT NULL,
	img4_type VARCHAR(100) NOT NULL
);

SELECT * FROM toolsBorrowHistory

ALTER TABLE toolsBorrowHistory
MODIFY COLUMN img1_data LONGBLOB,
MODIFY COLUMN img2_data LONGBLOB,
MODIFY COLUMN img3_data LONGBLOB,
MODIFY COLUMN img4_data LONGBLOB;


-- Create [Tools-Return-History] Table
CREATE TABLE toolsReturnHistory (
	id INT NOT NULL AUTO_INCREMENT KEY,
	studentID INT NOT NULL,
	toolCode VARCHAR(10) NOT NULL,
	returnCode VARCHAR(255) NOT NULL,
	returnDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	toolName VARCHAR(255) NOT NULL,
	quantity INT NOT NULL,
	img1_data BLOB NOT NULL,
	img1_type VARCHAR(100) NOT NULL,
	img2_data BLOB NOT NULL,
	img2_type VARCHAR(100) NOT NULL,
	img3_data BLOB NOT NULL,
	img3_type VARCHAR(100) NOT NULL,
	img4_data BLOB NOT NULL,
	img4_type VARCHAR(100) NOT NULL
);

SELECT * FROM toolsReturnHistory

ALTER TABLE toolsReturnHistory
MODIFY COLUMN img1_data LONGBLOB,
MODIFY COLUMN img2_data LONGBLOB,
MODIFY COLUMN img3_data LONGBLOB,
MODIFY COLUMN img4_data LONGBLOB;

------------------------------- Contact --------------------------------------
-- Create [Info-Contact] Table
CREATE TABLE info_contact (
	id INT NOT NULL AUTO_INCREMENT KEY,
	topic VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	address VARCHAR(255) NOT NULL,
	mobile VARCHAR(50) NOT NULL,
	available VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL
);

SELECT * FROM info_contact
INSERT INTO info_contact (topic, description, address, mobile, available, email, facebook, tiktok)
VALUES ('Contact Detail', 'เพรสโหงววอล์ก เกมส์คอนเทนเนอร์พล็อตท็อปบู๊ท', 'building 5, floor 8, Comen-Room', '022345678', 'Daily 09 - 05 PM', 'comen.spu@gmail.com', 'a', 'b');

ALTER TABLE info_contact
MODIFY COLUMN mobile VARCHAR(50);

-- Create [Contact] Table
CREATE TABLE contact (
	id INT NOT NULL AUTO_INCREMENT KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	message TEXT NOT NULL
);

INSERT INTO contact (name, email, message)
VALUES ()

-- Create [info_studyPlant] Table
CREATE TABLE info_studyPlan (
	id INT NOT NULL AUTO_INCREMENT KEY,
	topic VARCHAR(255) NOT NULL,
	description1 TEXT NOT NULL,
	description2 TEXT NOT NULL
);

INSERT INTO info_studyPlan (topic, description1, description2)
VALUES ('studyPlan', 'เพรสโหงววอล์ก เกมส์คอนเทนเนอร์พล็อตท็อปบู๊ท', 'เพรสโหงววอล์ก เกมส์คอนเทนเนอร์พล็อตท็อปบู๊ท');
 
ALTER TABLE info_studyPlan
MODIFY COLUMN description1 TEXT,
MODIFY COLUMN description2 TEXT;

-- Create [info_degree] Table
CREATE TABLE info_degree (
	id INT NOT NULL AUTO_INCREMENT KEY,
	thDegree VARCHAR(255) NOT NULL,
	thAbbre VARCHAR(255) NOT NULL,
	enDegree VARCHAR(255) NOT NULL,
	enAbbre VARCHAR(255) NOT NULL,
	studyDateTime VARCHAR(255) NOT NULL
);

INSERT INTO info_degree (thDegree, thAbbre, enDegree, enAbbre, studyDateTime)
VALUES ('thDegree', 'thAbbre', 'enDegree', 'enAbbre', 'studyDateTime');
 
-- Create [info_careerPath] Table
CREATE TABLE info_careerPath (
	id INT NOT NULL AUTO_INCREMENT KEY,
	careerPaths TEXT NOT NULL,
	careerDescs TEXT NOT NULL
);

INSERT INTO info_careerPath (careerPaths)
VALUES ('a, b, c');


-- Create [Youtube - Review] Table
CREATE TABLE info_youtube_review (
	id INT NOT NULL AUTO_INCREMENT KEY,
	topic VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	embed TEXT NOT NULL
);

INSERT INTO info_youtube_review (topic, description, embed)
VALUES ('a', 'b', 'c');
 
ALTER TABLE info_youtube_review
MODIFY COLUMN description TEXT;

-- Create [studentYoutube] Table
CREATE TABLE studentYoutube (
	id INT NOT NULL AUTO_INCREMENT KEY,
	fname VARCHAR(255) NOT NULL,
	lname VARCHAR(255) NOT NULL,
	studentID VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	embed TEXT NOT NULL,
	status VARCHAR(10) NOT NULL DEFAULT 'Waiting'
);

INSERT INTO studentYoutube (fname, lname, studentID, description, embed)
VALUES ('Owner', 'Name', '64053441', 'ช็อปปิ้งไฮเทคแอลมอนด์โค้ก แชมเปญไวกิ้งยาวี แบ็กโฮเอนทรานซ์สปาย แอพพริคอททรูเหมยอุปการคุณ ตะหงิด', '<iframe width="364" height="647" src="https://www.youtube.com/embed/FM3wWbW3IhA" title="REPORT PHO? lol" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');


------------------------------- Showcase(youtube) --------------------------------------
-- Create [Info-Showcase (youtube)] Table
CREATE TABLE  info_youtube (
	id INT NOT NULL AUTO_INCREMENT KEY,
	topic VARCHAR(255) NOT NULL,
	description TEXT NOT NULL
);

insert into info_youtube (topic, description)
values('Showcase (Youtube)', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint est, quisquam error aliquid odit a nihil eaque dolorum tempore pariatur asperiores enim, totam delectus, perspiciatis nam doloremque explicabo illum repudiandae.');