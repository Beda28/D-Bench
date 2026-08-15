USE `d_bench`;

CREATE TABLE IF NOT EXISTS `user` (
    `uuid` CHAR(36) NOT NULL PRIMARY KEY,
    `id` VARCHAR(10) NOT NULL,
    `pw` VARCHAR(255) NOT NULL,
    INDEX `idx_user_id` (`id`)
);
