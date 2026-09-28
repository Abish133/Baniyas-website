-- ------------------------------------------------------------------
-- Bani Yas website — initial schema (MySQL 8 / MariaDB 10.6+)
-- ------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admin_users (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name            VARCHAR(80)  NOT NULL,
  email           VARCHAR(191) NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  last_login_at   DATETIME     NULL,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Editable section headings / images (key-value)
CREATE TABLE IF NOT EXISTS site_settings (
  setting_key     VARCHAR(100) NOT NULL,
  setting_value   TEXT         NULL,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home: "Our Trusted Clients" logo marquee
CREATE TABLE IF NOT EXISTS trusted_clients (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name            VARCHAR(120) NOT NULL,
  logo            VARCHAR(255) NOT NULL,
  is_active       TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order      INT          NOT NULL DEFAULT 0,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_trusted_clients_order (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home: counters (35+ Complete Projects ...)
CREATE TABLE IF NOT EXISTS home_stats (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  label           VARCHAR(40)  NOT NULL,
  value           INT UNSIGNED NOT NULL,
  suffix          VARCHAR(5)   NOT NULL DEFAULT '+',
  is_active       TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order      INT          NOT NULL DEFAULT 0,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Services: home slider cards + services page details
CREATE TABLE IF NOT EXISTS services (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug              VARCHAR(120) NOT NULL,
  card_title        VARCHAR(40)  NOT NULL,
  title             VARCHAR(80)  NOT NULL,
  icon              VARCHAR(60)  NOT NULL DEFAULT 'flaticon-layers',
  image             VARCHAR(255) NULL,
  description1      TEXT         NULL,
  description2      TEXT         NULL,
  subtitle          VARCHAR(150) NULL,
  main_content      TEXT         NULL,
  detail_image1     VARCHAR(255) NULL,
  detail_image2     VARCHAR(255) NULL,
  final_description TEXT         NULL,
  show_on_home      TINYINT(1)   NOT NULL DEFAULT 1,
  show_on_page      TINYINT(1)   NOT NULL DEFAULT 1,
  is_active         TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order        INT          NOT NULL DEFAULT 0,
  created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_services_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_benefits (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  service_id      INT UNSIGNED NOT NULL,
  content         VARCHAR(200) NOT NULL,
  sort_order      INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_service_benefits_service (service_id),
  CONSTRAINT fk_service_benefits_service FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS service_faqs (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  service_id      INT UNSIGNED NOT NULL,
  question        VARCHAR(200) NOT NULL,
  answer          TEXT         NOT NULL,
  sort_order      INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_service_faqs_service (service_id),
  CONSTRAINT fk_service_faqs_service FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home: hover-expand project showcase
CREATE TABLE IF NOT EXISTS home_projects (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title           VARCHAR(80)  NOT NULL,
  location        VARCHAR(60)  NOT NULL,
  image           VARCHAR(255) NOT NULL,
  is_active       TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order      INT          NOT NULL DEFAULT 0,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Portfolio page grid
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  caption         VARCHAR(200) NOT NULL,
  image           VARCHAR(255) NOT NULL,
  is_active       TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order      INT          NOT NULL DEFAULT 0,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- About: "Our Clients" grid
CREATE TABLE IF NOT EXISTS clients (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name            VARCHAR(120) NOT NULL,
  is_active       TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order      INT          NOT NULL DEFAULT 0,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Careers: open positions (replaces the Google Sheet)
CREATE TABLE IF NOT EXISTS job_openings (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title           VARCHAR(100) NOT NULL,
  job_type        VARCHAR(40)  NOT NULL DEFAULT 'Full-time',
  location        VARCHAR(100) NOT NULL,
  experience      VARCHAR(60)  NOT NULL,
  requirements    TEXT         NULL,
  apply_link      VARCHAR(255) NULL,
  is_active       TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order      INT          NOT NULL DEFAULT 0,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(191) NOT NULL,
  phone           VARCHAR(30)  NULL,
  message         TEXT         NULL,
  is_read         TINYINT(1)   NOT NULL DEFAULT 0,
  ip_address      VARCHAR(45)  NULL,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_messages_read (is_read, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
