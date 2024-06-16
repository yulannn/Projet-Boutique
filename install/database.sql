CREATE TABLE Role (
    id_role INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255)
);


CREATE TABLE Team (
    team_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    origin VARCHAR(255),
    logo_path VARCHAR(255),
    description TEXT
);

CREATE TABLE Reduction (
    id_reduction INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255),
    pourcentage_reduction DECIMAL(5,2),
    start_date DATE,
    end_date DATE
);


CREATE TABLE Accounts (
    id_account INT PRIMARY KEY AUTO_INCREMENT,
    id_role INT,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255),
    created_at DATETIME,
    FOREIGN KEY (id_role) REFERENCES Role(id_role)
);

CREATE TABLE Jersey (
    id_jersey INT PRIMARY KEY AUTO_INCREMENT,
    id_reduction INT,
    team_id INT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    created_at DATETIME,
    description TEXT,
    material VARCHAR(255),
    color VARCHAR(50),
    currency VARCHAR(3),
    FOREIGN KEY (id_reduction) REFERENCES Reduction(id_reduction),
    FOREIGN KEY (team_id) REFERENCES Team(team_id)
);

CREATE TABLE Sizes (
    id_size INT PRIMARY KEY AUTO_INCREMENT,
    size VARCHAR(10)
);

CREATE TABLE Stock (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_jersey INT,
    id_size INT,
    stock INT NOT NULL,
    FOREIGN KEY (id_jersey) REFERENCES Jersey(id_jersey),
    FOREIGN KEY (id_size) REFERENCES Sizes(id_size)
);

CREATE TABLE Jersey_image (
    id_image INT PRIMARY KEY AUTO_INCREMENT,
    id_jersey INT,
    url_path VARCHAR(255),
    FOREIGN KEY (id_jersey) REFERENCES Jersey(id_jersey)
);


CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    id_account INT,
    total_price DECIMAL(10, 2),
    shipping_address TEXT,
    order_date DATETIME,
    payment_method VARCHAR(50),
    status VARCHAR(50),
    FOREIGN KEY (id_account) REFERENCES Accounts(id_account)
);


CREATE TABLE Jersey_order (
    id_jersey INT,
    id_order INT,
    size VARCHAR(10),
    quantity INT,
    PRIMARY KEY (id_jersey, id_order),
    FOREIGN KEY (id_jersey) REFERENCES Jersey(id_jersey),
    FOREIGN KEY (id_order) REFERENCES Orders(order_id)
);

CREATE TABLE Review (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    id_account INT,
    id_jersey INT,
    review_content TEXT,
    created_at DATETIME,
    note INT,
    FOREIGN KEY (id_account) REFERENCES Accounts(id_account),
    FOREIGN KEY (id_jersey) REFERENCES Jersey(id_jersey)
);

CREATE TABLE players (
    player_id INT PRIMARY KEY AUTO_INCREMENT,
    pseudo VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INT,
    lane VARCHAR(50),
    origin VARCHAR(100),
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES team(team_id)
);

INSERT INTO team (name, origin, logo_path, description) VALUES
("SKT T1", "KR", "T1.png", "SK Telecom T1 est l'une des organisations les plus emblématiques de l'esport, ayant dominé la scène compétitive sud-coréenne depuis des années. Fondée en 2003, SKT T1 est célèbre pour ses multiples victoires dans des tournois majeurs, notamment League of Legends, où ils ont remporté plusieurs championnats mondiaux."),
("BILI BILI", "CN", "BLG.png", "Bilibili Gaming, souvent abrégé en BLG, est une équipe de sports électroniques chinoise en plein essor. Fondée en 2017, BLG a rapidement gagné en notoriété grâce à ses performances solides dans des jeux tels que League of Legends et Dota 2. Ils sont connus pour leur style de jeu agressif et leur esprit d'équipe."),
("CLOUD9", "US", "CLOUD9.png", "Cloud9 est une organisation de sports électroniques basée aux États-Unis, réputée pour son succès dans une variété de jeux, y compris Counter-Strike: Global Offensive, Fortnite et League of Legends. Fondée en 2013, Cloud9 a construit une solide communauté de fans et continue d'être un acteur majeur dans l'esport mondial."),
("EDWARD GAMING", "CN", "EDWARD.png", "Edward Gaming, également connue sous le nom de EDG, est une équipe professionnelle chinoise de sports électroniques. Fondée en 2013, EDG a remporté de nombreux titres nationaux et internationaux dans des jeux tels que League of Legends et Honor of Kings. Leur engagement envers l'excellence et la stratégie en fait une force redoutable sur la scène compétitive."),
("FNATIC", "GB", "FNATIC.png", "Fnatic est une organisation britannique de sports électroniques reconnue pour son héritage dans des jeux comme League of Legends, Counter-Strike et Dota 2. Depuis sa création en 2004, Fnatic a accumulé un palmarès impressionnant, avec des titres mondiaux et une présence constante parmi les meilleures équipes du monde."),
("G2 ESPORT", "ES", "G2.png", "G2 Esports est une organisation espagnole de sports électroniques à la pointe de l'innovation et de la compétitivité. Fondée en 2013, G2 s'est distinguée dans des jeux comme League of Legends, Rainbow Six Siege et Rocket League, remportant des championnats et établissant un standard élevé pour les performances esportives."),
("GEN.G", "KR", "GENG.png", "Gen.G Esports est une organisation de sports électroniques sud-coréenne qui excelle dans divers jeux, y compris League of Legends, PUBG et Overwatch. Fondée en 2017, Gen.G s'est rapidement imposée comme l'une des meilleures équipes d'Asie, avec des joueurs talentueux et une stratégie de jeu solide."),
("GIANTX", "GB", "GIANTX.png", "GiantX est une équipe britannique de sports électroniques émergente, se concentrant principalement sur des jeux de tir et des compétitions FPS. Avec des joueurs talentueux et une approche stratégique, GiantX cherche à se faire une place parmi les meilleures équipes du Royaume-Uni et de l'Europe."),
("HERETICS", "ES", "HERETICS.png", "Heretics est une équipe espagnole de sports électroniques connue pour son style de jeu agressif et innovant. Fondée en 2016, Heretics a rapidement acquis une solide réputation dans des jeux comme Call of Duty et Valorant, se distinguant par ses performances impressionnantes lors de tournois nationaux et internationaux."),
("HANWHA LIFE", "KR", "HLE.png", "Hanwha Life Esports est une équipe professionnelle sud-coréenne de sports électroniques, principalement active dans le jeu League of Legends. Depuis sa création en 2018, Hanwha Life Esports a consolidé sa position parmi les meilleures équipes de la région, avec des stratégies de jeu élaborées et une équipe talentueuse."),
("JD GAMING", "CN", "JDG.png", "JD Gaming, souvent abrégé en JDG, est une organisation chinoise de sports électroniques reconnue pour son succès dans des jeux comme League of Legends et Honor of Kings. Depuis sa fondation en 2017, JDG a remporté plusieurs titres et continue d'être une force compétitive sur la scène esportive chinoise."),
("KARMINE CORP", "FR", "KCORP.png", "Karmine Corp est une équipe française de sports électroniques émergente, spécialisée dans des jeux comme League of Legends et Valorant. Fondée en 2020, Karmine Corp s'est rapidement fait un nom grâce à ses performances lors de tournois nationaux et européens, attirant l'attention des fans et des observateurs de l'esport."),
("TEAM LIQUID", "US", "LIQUID.png", "Team Liquid est une organisation néerlandaise de sports électroniques qui a marqué l'histoire de l'esport avec des performances remarquables dans des jeux comme Dota 2, StarCraft II et CS:GO. Fondée en 2000, Team Liquid est réputée pour son professionnalisme et son engagement envers l'excellence compétitive."),
("LOUD ESPORT", "BR", "LOUD.png", "LOUD Esports est une organisation brésilienne de sports électroniques dynamique, représentant le Brésil dans des jeux populaires comme League of Legends, Free Fire et Rainbow Six Siege. Depuis sa fondation en 2018, LOUD a captivé les fans brésiliens avec ses victoires impressionnantes et sa passion pour la compétition."),
("MAD LIONS", "ES", "MAD-LIONS.png", "MAD Lions est une équipe espagnole de sports électroniques audacieuse et déterminée, spécialisée dans des jeux tels que League of Legends et Clash Royale. Fondée en 2017, MAD Lions s'est rapidement imposée comme l'une des meilleures équipes d'Europe, avec un style de jeu agressif et des performances remarquables."),
("NRG ESPORT", "US", "NRG.png", "NRG Esports est une organisation de sports électroniques basée aux États-Unis, connue pour son engagement dans des jeux comme Overwatch, Fortnite et Rocket League. Depuis sa création en 2015, NRG a établi des partenariats solides et a atteint des sommets dans la compétition esportive mondiale."),
("ROGUE", "US", "ROGUE.png", "Rogue est une organisation de sports électroniques américaine qui a la réputation de prendre des risques et d'innover dans des jeux comme League of Legends, Rainbow Six Siege et Rocket League. Depuis 2016, Rogue a accumulé des succès et est reconnue comme l'une des meilleures équipes d'Amérique du Nord."),
("TOP ESPORTS", "CN", "TES.png", "Top Esports est une équipe chinoise de sports électroniques de premier plan, excellant dans des jeux comme League of Legends et PUBG Mobile. Depuis sa création en 2017, Top Esports a dominé la scène compétitive chinoise avec des performances impressionnantes et un jeu stratégique."),
("VITALITY", "FR", "VITALITY.png", "Team Vitality est une organisation française de sports électroniques qui a connu un succès remarquable dans des jeux comme League of Legends, CS:GO et Rocket League. Depuis sa fondation en 2013, Vitality s'est imposée comme l'une des meilleures équipes d'Europe, avec un roster talentueux et une mentalité gagnante."),
("WEIBO GAMING", "CN", "WEIBO.png", "Weibo Gaming est une équipe chinoise de sports électroniques en plein essor, engagée dans des jeux comme League of Legends et Honor of Kings. Depuis sa création en 2019, Weibo Gaming a montré un potentiel prometteur, attirant l'attention des fans chinois et devenant une force compétitive sur la scène esportive chinoise.");

INSERT INTO players (pseudo, first_name, last_name, age, lane, origin, team_id) VALUES
('Zeus', 'Choi', 'Woo-je', 20, 'top', 'KR', 1),
('Oner', 'Mun', 'Hyeon-jun', 21, 'jungle', 'KR', 1),
('Faker', 'Lee', 'Sang-hyeok', 27, 'mid', 'KR', 1),
('Gumayusi', 'Lee', 'Min-hyeong', 22, 'bottom', 'KR', 1),
('Keria', 'Ryu', 'Min-seok', 21, 'support', 'KR', 1),
('Bin', 'Chen', 'Ze-Bin', 20, 'top', 'CN', 2),
('Xun', 'Peng', 'Li-Xun', 22, 'jungle', 'CN', 2),
('Knight', 'Zhuo', 'Ding', 23, 'mid', 'CN', 2),
('Eik', 'Zhao', 'Jia-Hao', 22, 'bottom', 'CN', 2),
('ON', 'Luo', 'Wen-Jun', 21, 'support', 'CN', 2),
('Thanatos', 'Park', 'Seung-gyu', 20, 'top', 'KR', 3),
('Blaber', 'Robert', 'Huang', 24, 'jungle', 'US', 3),
('Jojopyun', 'Joseph', 'Joon Pyun', 19, 'mid', 'CA', 3),
('Berserker', 'Kim', 'Min-cheol', 20, 'bottom', 'KR', 3),
('VULCAN', 'Philippe', 'Laflamme', 21, 'support', 'CA', 3),
('Solokill', 'Mak', 'Fu Keung', 22, 'top', 'HK', 4),
('Monki', 'Wang', 'Meng-Qi', 20, 'jungle', 'CN', 4),
('0909', 'Chi', 'Zhi-Hong', 20, 'mid', 'CN', 4),
('Thesnake', 'Kang', 'Guang', 19, 'bottom', 'CN', 4),
('Xiamu', 'Wang', 'Yong-Xu', 21, 'support', 'CN', 4),
('Oscarinin', 'Óscar', 'Muñoz Jiménez', 20, 'top', 'ES', 5),
('Razork', 'Iván', 'Martín Díaz', 23, 'jungle', 'ES', 5),
('Humanoid', 'Marek', 'Brázda', 24, 'mid', 'CZ', 5),
('Noah', 'Oh', 'Hyeon-taek', 22, 'bottom', 'KR', 5),
('Jun', 'Yoon', 'Se-jun', 23, 'support', 'KR', 5),
('BrokenBlade', 'Sergen', 'Çelik', 24, 'top', 'DE', 6),
('Yike', 'Martin', 'Sundelin', 23, 'jungle', 'SE', 6),
('Caps', 'Rasmus', 'Borregaard Winther', 24, 'mid', 'DK', 6),
('Hans Sama', 'Steven', 'Liv', 24, 'bottom', 'FR', 6),
('Mikyx', 'Mihael', 'Mehle', 25, 'support', 'SI', 6),
('Kiin', 'Kim', 'Gi-in', 24, 'top', 'KR', 7),
('Canyon', 'Kim', 'Geon-bu', 22, 'jungle', 'KR', 7),
('Chovy', 'Jeong', 'Ji-hoon', 23, 'mid', 'KR', 7),
('Peyz', 'Kim', 'Su-hwan', 18, 'bottom', 'KR', 7),
('Lehends', 'Son', 'Si-woo', 30, 'support', 'KR', 7),
('Th3Antonio', 'Antonio', 'Espinosa Bejarano', 25, 'top', 'ES', 8),
('Peach', 'Lee', ' Min-gyu', 24, 'jungle', 'KR', 8),
('Jackies', 'Adam', 'Jeřábek', 19, 'mid', 'CZ', 8),
('Patrik', 'Patrik', 'Jírů', 24, 'bottom', 'CZ', 8),
('IgNar', 'Lee', 'Dong-geun', 27, 'support', 'KR', 8),
('Wunder', 'Martin', 'Nordahl Hansen', 25, 'top', 'DK', 9),
('Jankos', 'Marcin', 'Jankowski', 28, 'jungle', 'PL', 9),
('Zwyroo', 'Artur', 'Trojan', 25, 'mid', 'PL', 9),
('Flakked', 'Victor', 'Lirola Tortosa', 23, 'bottom', 'ES', 9),
('Trymbi', 'Norman', 'Kaiser', 26, 'support', 'DE', 9),
('Doran', 'Choi', 'Hyeon-joon', 23, 'top', 'KR', 10),
('Peanut', 'Han', 'Wang-ho', 26, 'jungle', 'KR', 10),
('Zeka', 'Kim', 'Geon-woo', 21, 'mid', 'KR', 10),
('Viper', 'Park', 'Do-hyeon', 23, 'bottom', 'KR', 10),
('Delight', 'Yoo', 'Hwan-joong', 21, 'support', 'KR', 10),
('Flandre', 'Li', 'Xuan-Jun', 25, 'top', 'CN', 11),
('Kanavi', 'Seo', 'Jin-hyeok', 23, 'jungle', 'KR', 11),
('Yagao', 'Zeng', 'Qi', 25, 'mid', 'CN', 11),
('Ruler', 'Park', 'Jae-hyuk', 25, 'bottom', 'KR', 11),
('Missing', 'Lou', 'Yun-feng', 22, 'support', 'CN', 11),
('Canna', 'Kim', 'Chang-dong', 24, 'top', 'KR', 12),
('Closer', 'Can', 'Çelik', 25, 'jungle', 'TR', 12),
('Vladi', 'Vladimiros', 'Kourtidis', 18, 'mid', 'GR', 12),
('Upset', 'Elias', 'Lipp', 24, 'bottom', 'DE', 12),
('Targamas', 'Raphaël', 'Crabbé', 23, 'support', 'BE', 12),
('Impact', 'Jeong', 'Eon-young', 29, 'top', 'KR', 13),
('UmTi', 'Eom', 'Seong-hyeon', 24, 'jungle', 'KR', 13),
('APA', 'Eain', 'Stearns', 22, 'mid', 'US', 13),
('Yeon', 'Sean', 'Sung', 23, 'bottom', 'US', 13),
('CoreJJ', 'Jo', 'Yong-in', 29, 'support', 'KR', 13),
('Robo', 'Leonardo', 'Souza', 26, 'top', 'BR', 14),
('Croc', 'Park', ' Jong-hoon', 26, 'jungle', 'KR', 14),
('tinowns', 'Thiago', 'Sartori', 27, 'mid', 'BR', 14),
('Route', 'Moon', 'Geom-su', 25, 'bottom', 'KR', 14),
('RedBert', 'Ygor', 'Freitas', 25, 'support', 'BR', 14),
('Myrwn', 'Alex', 'Pastor Villarejo', 20, 'top', 'ES', 15),
('Elyoya', 'Javier', 'Prades Batalla', 24, 'jungle', 'ES', 15),
('Fresskowy', 'Bartlomiej', 'Przewoznik', 24, 'mid', 'PL', 15),
('Supa', 'David', 'Martínez García', 23, 'bottom', 'ES', 15),
('Alvaro', 'Álvaro', 'Fernández del Amo', 20, 'support', 'ES', 15),
('Dhokla', 'Niship', 'Doshi', 26, 'top', 'US', 16),
('Contractz', 'Juan', 'Arturo Garcia', 24, 'jungle', 'US', 16),
('Palafox', 'Cristian', 'Palafox', 24, 'mid', 'US', 16),
('FBI', 'Ian', 'Victor Huang', 25, 'bottom', 'AU', 16),
('huhi', 'Choi', 'Jae-hyun', 29, 'support', 'KR', 16),
('Finn', 'Finn', 'Wiestal', 24, 'top', 'SE', 17),
('Markoon', 'Mark', 'van Woensel', 21, 'jungle', 'NL', 17),
('Larssen', 'Emil', 'Larsson', 24, 'mid', 'SE', 17),
('Comp', 'Markos', 'Stamkopoulos', 22, 'bottom', 'GR', 17),
('Zoelys', 'ThÃ©o', 'Le Scornec', 21, 'support', 'FR', 17),
('369', 'Bai', 'Jia-Hao', 22, 'top', 'CN', 18),
('Tian', 'Gao', 'Tian-Liang', 23, 'jungle', 'CN', 18),
('Creme', 'Lin', 'Jian', 20, 'mid', 'CN', 18),
('JackeyLove', 'Yu', 'Wen-Bo', 23, 'bottom', 'CN', 18),
('Meiko', 'Tian', 'Ye', 25, 'support', 'CN', 18),
('Photon', 'Kyeong', 'Gyu-tae', 22, 'top', 'KR', 19),
('Lyncas', 'Linas', 'Nauncikas', 20, 'jungle', 'LT', 19),
('Vetheo', 'Vincent', 'Berrié', 21, 'mid', 'FR', 19),
('Carzzy', 'Matyás', 'Orság', 22, 'bottom', 'CZ', 19),
('Hylissang', 'Zdravets', 'Iliev Galabov', 29, 'support', 'BG', 19),
('Breathe', 'Chen', 'Chen', 23, 'top', 'CN', 20),
('Tarzan', 'Lee', 'Seung-yong', 24, 'jungle', 'KR', 20),
('Xiaohu', 'Li', 'Yuan-Hao', 26, 'mid', 'CN', 20),
('Light', 'Wang', 'Guang-Yu', 23, 'bottom', 'CN', 20),
('Crisp', 'Liu', 'Qing-Song', 24, 'support', 'CN',20);

INSERT INTO role (role_name) VALUES
('administrateur'),
('membre');

INSERT INTO jersey (team_id, name, price, created_at, description, material, color, currency) VALUES 
(1, 'T1 Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe T1 saison 2023', 'Polyester', 'Rouge/Noir', 'EUR'),
(1, 'T1 Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe T1 saison 2024', 'Polyester', 'Noir/Blanc', 'EUR'),
(2, 'BLG Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe Bili Bili saison 2024', 'Polyester', 'Blanc', 'EUR'),
(3, 'Cloud9 Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe Cloud9 saison 2023', 'Polyester', 'Bleu', 'EUR'),
(3, 'Cloud9 Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe Cloud9 saison 2024', 'Polyester', 'Noir/Bleu', 'EUR'),
(4, 'EDG Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe EDG saison 2023', 'Polyester', 'Rouge/Noir', 'EUR'),
(5, 'Fnatic Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe Fnatic saison 2023', 'Polyester', 'Noir/Orange', 'EUR'),
(5, 'Fnatic Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe Fnatic saison 2024', 'Polyester', 'Noir/Orange', 'EUR'),
(6, 'G2 Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe G2 saison 2023', 'Polyester', 'Noir', 'EUR'),
(6, 'G2 Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe G2 saison 2024', 'Polyester', 'Noir', 'EUR'),
(7, 'GEN.G Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe GEN.G saison 2024', 'Polyester', 'Noir/Jaune', 'EUR'),
(8, 'GIANTX Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe GIANTX saison 2024', 'Polyester', 'Bleu/Noir', 'EUR'),
(9, 'HERETICS Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe HERETICS saison 2023', 'Polyester', 'Bleu/Noir', 'EUR'),
(9, 'HERETICS Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe HERETICS saison 2024', 'Polyester', 'Bleu/Jaune', 'EUR'),
(10, 'HLE Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe HANWHA LIFE saison 2023', 'Polyester', 'Noir/Orange', 'EUR'),
(11, 'JDG Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe JD GAMING saison 2023', 'Polyester', 'Bleu/Rouge', 'EUR'),
(12, 'KC Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe KARMINE CORP saison 2023', 'Polyester', 'Noir/Bleu', 'EUR'),
(12, 'KC Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe KARMINE CORP saison 2024', 'Polyester', 'Bleu', 'EUR'),
(13, 'TEAM LIQUID Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe TEAM LIQUID saison 2023', 'Polyester', 'Bleu/Blanc', 'EUR'),
(14, 'LOUD ESPORT Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe LOUD ESPORT saison 2023', 'Polyester', 'Noir/Vert', 'EUR'),
(15, 'MAD LIONS Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe MAD LIONS saison 2023', 'Polyester', 'Blanc/Bleu', 'EUR'),
(15, 'MAD LIONS Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe MAD LIONS saison 2024', 'Polyester', 'Bleu/Blanc', 'EUR'),
(16, 'NRG Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe NRG saison 2023', 'Polyester', 'Noir/Blanc', 'EUR'),
(16, 'NRG Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe NRG saison 2024', 'Polyester', 'Blanc/Noir', 'EUR'),
(17, 'ROGUE Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe ROGUE saison 2023', 'Polyester', 'Bleu', 'EUR'),
(17, 'ROGUE Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe ROGUE saison 2024', 'Polyester', 'Bleu', 'EUR'),
(18, 'TES Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe TOP ESPORTS saison 2023', 'Polyester', 'Noir/Orange', 'EUR'),
(19, 'VITALITY Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe VITALITY saison 2023', 'Polyester', 'Noir/Jaune', 'EUR'),
(19, 'VITALITY Jersey 2024', 79.99, NOW(), 'Maillot de l\'équipe VITALITY saison 2024', 'Polyester', 'Noir/Jaune', 'EUR'),
(20, 'WEIBO Jersey 2023', 59.99, NOW(), 'Maillot de l\'équipe WEIBO GAMING saison 2023', 'Polyester', 'Blanc', 'EUR');



INSERT INTO jersey_image (id_jersey, url_path) VALUES
(1, "T1-2023.png"),
(2, "T1-2024.png"),
(3, "BILIBILI-2024.png"),
(4, "CLOUD9-2023.png"),
(5, "CLOUD9-2024.png"),
(6, "EDWARD-2023.png"),
(7, "FNATIC-2023.png"),
(8, "FNATIC-2024.png"),
(9, "G2-2023.png"),
(10, "G2-2024.png"),
(11, "GENG-2024.png"),
(12, "GIANTX-2024.png"),
(13, "HERETICS-2023.png"),
(14, "HERETICS-2024.png"),
(15, "HLE-2023.png"),
(16, "JDG-2023.png"),
(17, "KCORP-2023.png"),
(18, "KCORP-2024.png"),
(19, "LIQUID-2023.png"),
(20, "LOUD-2023.png"),
(21, "MAD-LIONS-2023.png"),
(22, "MAD-LIONS-2024.png"),
(23, "NRG-2023.png"),
(24, "NRG-2024.png"),
(25, "ROGUE-2023.png"),
(26, "ROGUE-2024.png"),
(27, "TES-2023.png"),
(28, "VITALITY-2023.png"),
(29, "VITALITY-2024.png"),
(30, "WEIBO-2023.png");


INSERT INTO Sizes (size) VALUES
('XS'),
('S'),
('M'),
('L'),
('XL'),
('XXL');

INSERT INTO Stock (id_jersey, id_size, stock)
SELECT id_jersey, id_size, 10
FROM Jersey
CROSS JOIN Sizes;


INSERT INTO Reduction (description, pourcentage_reduction, start_date, end_date) 
VALUES ("Réduction d\'été", 15.00, '2024-06-15', '2024-08-15');

INSERT INTO Reduction (description, pourcentage_reduction, start_date, end_date) 
VALUES ('Promo rentrée scolaire', 20.00, '2024-06-15', '2024-09-15');

update jersey set id_reduction = 1 where id_jersey = 1;

update jersey set id_reduction = 2 where id_jersey = 3;

insert into Accounts (id_role, email, first_name, last_name, password)
VALUES (1, "romaing@gmail.com", "Romain", "Goud", "94cdacc9445e26661da952b34557b9761aa33bff098c5c0073eeddd010fc133fe108a2a9281878ba77dbd6c41572e430da0d941635a378bebd0ae2d3a0369abe"),
(1, "yulann@gmail.com", "Yulan", "Nguy", "94cdacc9445e26661da952b34557b9761aa33bff098c5c0073eeddd010fc133fe108a2a9281878ba77dbd6c41572e430da0d941635a378bebd0ae2d3a0369abe");


INSERT INTO Review (id_account, id_jersey, review_content, created_at, note)
VALUES 
(2, 3, 'Maillot de qualité correcte. Il est bien fait mais je trouve qu\'il manque un peu de confort. La matière est un peu rigide à mon goût, mais cela reste un bon produit pour le prix.', NOW(), 3),
(2, 5, 'Pas mal, mais pourrait être mieux. Le maillot est joli, mais je trouve qu\'il n\'est pas aussi confortable que je l\'espérais. Peut-être qu\'il s\'adoucira après quelques lavages.', NOW(), 3),
(2, 7, 'Agréable au toucher. Le tissu est doux et agréable sur la peau, mais je trouve que la taille est un peu petite. Il faudrait peut-être prendre une taille au-dessus.', NOW(), 3),
(2, 9, 'Le design est bon, mais taille petite. J\'aime beaucoup le design de ce maillot, mais il taille vraiment petit. Je recommande de prendre au moins une taille au-dessus.', NOW(), 2),
(2, 11, 'Bon achat, satisfait. Je suis satisfait de ce maillot, il est confortable et de bonne qualité. Rien à redire pour le prix.', NOW(), 4),
(2, 13, 'Bonne durabilité. Ce maillot est vraiment durable, il tient bien après plusieurs lavages. Le tissu est résistant et ne se déforme pas.', NOW(), 4),
(2, 15, 'Joli et confortable. Ce maillot est à la fois joli et confortable. Il est parfait pour les activités sportives et décontractées.', NOW(), 4),
(2, 17, 'Matériau respirant, parfait pour le sport. Le tissu de ce maillot est très respirant et il est parfait pour mes séances de sport intensives. Je le recommande.', NOW(), 5),
(2, 19, 'Très fonctionnel et esthétique. Ce maillot combine parfaitement fonctionnalité et esthétique. Il est très confortable et bien ajusté.', NOW(), 5),
(2, 21, 'Je suis satisfait de cet achat. Le maillot est conforme à la description et très confortable. Je le porte régulièrement pour mes entraînements.', NOW(), 4),
(2, 23, 'Couleur vive et tissu agréable. J\'aime beaucoup la couleur vive de ce maillot, et le tissu est très agréable à porter. C\'est un bon produit.', NOW(), 4),
(2, 25, 'Conforme à la description. Le maillot est exactement comme décrit, il est confortable et de bonne qualité. Aucun problème jusqu\'à présent.', NOW(), 4),
(2, 27, 'Peu de défauts, bonne qualité. Le maillot a quelques petits défauts mais rien de majeur. La qualité générale est bonne.', NOW(), 3),
(2, 29, 'Parfait pour mon usage. Ce maillot est parfait pour mes besoins. Il est confortable et bien ajusté, je suis très satisfait.', NOW(), 5),
(2, 30, 'Très bon produit, je recommande. Le maillot est de très bonne qualité, confortable et bien fait. Je le recommande sans hésiter.', NOW(), 5);

INSERT INTO Review (id_account, id_jersey, review_content, created_at, note)
VALUES 
(1, 3, 'Très bon maillot, très confortable. Je le porte souvent pour mes entraînements et je suis très satisfait de sa qualité. Le matériau est doux et agréable sur la peau, et il respire bien pendant l\'effort.', NOW(), 5),
(1, 5, 'Bonne qualité, je recommande. Ce maillot a surpassé mes attentes, il est bien ajusté et très stylé. Je l\'ai déjà lavé plusieurs fois et il n\'a pas bougé, c\'est vraiment un bon produit.', NOW(), 5),
(1, 7, 'Belle couleur et bon matériau. J\'adore la couleur vive de ce maillot, elle reste intacte même après plusieurs lavages. Le tissu est également de bonne qualité et ne s\'use pas facilement.', NOW(), 4),
(1, 9, 'Maillot agréable à porter. Il est très léger et parfait pour les journées chaudes. Le tissu est respirant et évacue bien la transpiration, je le trouve vraiment pratique.', NOW(), 4),
(1, 11, 'Très stylé et bien ajusté. J\'aime beaucoup la coupe de ce maillot, il est très flatteur. De plus, il est très confortable, je le porte régulièrement pour mes séances de sport.', NOW(), 5),
(1, 13, 'Bon rapport qualité prix. Ce maillot est vraiment abordable pour la qualité qu\'il offre. Il est bien fait, les coutures sont solides et il résiste bien au lavage.', NOW(), 4),
(1, 15, 'J’aime beaucoup ce maillot. Il est non seulement confortable mais aussi très élégant. Je l\'ai reçu rapidement et je suis très content de mon achat.', NOW(), 5),
(1, 17, 'Parfait pour les entraînements. Ce maillot est idéal pour mes séances de sport. Il est léger, respirant et très confortable, je le recommande vivement.', NOW(), 5),
(1, 19, 'Tissu de haute qualité. Je suis impressionné par la qualité du tissu de ce maillot. Il est très doux et résistant, parfait pour une utilisation régulière.', NOW(), 5),
(1, 21, 'Super achat, très content. Je suis très satisfait de ce maillot, il est confortable et très bien fait. La taille est parfaite et il est très agréable à porter.', NOW(), 5),
(1, 23, 'Design moderne et attrayant. Ce maillot a un design vraiment sympa et moderne. Il est aussi très confortable et idéal pour le sport.', NOW(), 4),
(1, 25, 'Très résistant, bon achat. J\'ai été agréablement surpris par la résistance de ce maillot. Il tient bien même après plusieurs lavages et une utilisation intensive.', NOW(), 5),
(1, 27, 'Bon pour les matchs importants. Ce maillot est parfait pour les grandes occasions. Il est très confortable et offre une grande liberté de mouvement.', NOW(), 4),
(1, 29, 'Je l’adore, super confort. Ce maillot est vraiment confortable, je l\'adore. Il est bien ajusté et très agréable à porter.', NOW(), 5),
(1, 30, 'Coupe parfaite et beau look. La coupe de ce maillot est parfaite, il est très flatteur. En plus, il est très élégant et stylé.', NOW(), 5);