CREATE TABLE IF NOT EXISTS policy (
    id SERIAL PRIMARY KEY,
    ptype VARCHAR(255) NOT NULL,
    v0 VARCHAR(255) NOT NULL COMMENT 'role',
    v1 VARCHAR(255) NOT NULL COMMENT 'device',
    v2 VARCHAR(255) NOT NULL COMMENT 'op',
    v3 VARCHAR(255) NOT NULL DEFAULT '0',
    v4 VARCHAR(255) NOT NULL DEFAULT '0',
    v5 VARCHAR(255) NOT NULL DEFAULT '0',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;