-- Who changed what in the admin panel, and when.
CREATE TABLE IF NOT EXISTS admin_activity (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  admin_id        INT UNSIGNED NULL,
  admin_name      VARCHAR(80)  NOT NULL,
  action          VARCHAR(20)  NOT NULL,
  section         VARCHAR(60)  NOT NULL,
  item            VARCHAR(200) NULL,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_admin_activity_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
