DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos` (
  id int auto_increment PRIMARY KEY, 
  photo_id int, 
  user_id int, 
  album_id varchar(30), 
  lat varchar(20), 
  lng varchar(20),
  img    varchar(255),
  img_xs varchar(255), 
  img_s  varchar(255), 
  img_m  varchar(255), 
  img_l  varchar(255),
  timestamp int
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_unicode_ci;
