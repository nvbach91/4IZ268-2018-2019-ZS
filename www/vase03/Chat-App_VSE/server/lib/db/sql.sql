SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `simpledb` ;
CREATE SCHEMA IF NOT EXISTS `simpledb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `simpledb` ;

-- -----------------------------------------------------
-- Table `simpledb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `simpledb`.`users` ;

CREATE TABLE IF NOT EXISTS `simpledb`.`users` (
  `userID` INT UNSIGNED NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `socketID` VARCHAR(45) NULL,
  `last_login_date` DATETIME NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `simpledb`.`messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `simpledb`.`messages` ;

CREATE TABLE IF NOT EXISTS `simpledb`.`messages` (
  `messagesID` INT NOT NULL AUTO_INCREMENT,
  `from` INT UNSIGNED NOT NULL,
  `to` INT UNSIGNED NOT NULL,
  `content` VARCHAR(255) NULL,
  `delivery_status` VARCHAR(45) NULL DEFAULT '',
  `date` DATETIME NULL,
  PRIMARY KEY (`messagesID`, `to`, `from`),
  INDEX `from_userID_idx` (`from` ASC),
  INDEX `to_userID_idx` (`to` ASC),
  CONSTRAINT `from_userID`
    FOREIGN KEY (`from`)
    REFERENCES `simpledb`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `to_userID`
    FOREIGN KEY (`to`)
    REFERENCES `simpledb`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `simpledb`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `simpledb`;
INSERT INTO `simpledb`.`users` (`userID`, `username`, `password`, `socketID`, `last_login_date`) VALUES (1, 'user1', 'secret', NULL, NULL);
INSERT INTO `simpledb`.`users` (`userID`, `username`, `password`, `socketID`, `last_login_date`) VALUES (2, 'user2', 'secret', NULL, NULL);
INSERT INTO `simpledb`.`users` (`userID`, `username`, `password`, `socketID`, `last_login_date`) VALUES (3, 'user3', 'secret', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `simpledb`.`messages`
-- -----------------------------------------------------
START TRANSACTION;
USE `simpledb`;
INSERT INTO `simpledb`.`messages` (`messagesID`, `from`, `to`, `content`, `delivery_status`, `date`) VALUES (1, 1, 2, 'hello from 1 to 2', '', '2015-05-01 12:27:06');
INSERT INTO `simpledb`.`messages` (`messagesID`, `from`, `to`, `content`, `delivery_status`, `date`) VALUES (2, 1, 3, 'hello from 1 to 3', '', '2015-05-01 12:27:09');
INSERT INTO `simpledb`.`messages` (`messagesID`, `from`, `to`, `content`, `delivery_status`, `date`) VALUES (3, 2, 1, 'hello from 2 to 1', '', '2015-05-01 12:27:07');
INSERT INTO `simpledb`.`messages` (`messagesID`, `from`, `to`, `content`, `delivery_status`, `date`) VALUES (4, 2, 3, 'hello from 2 to 3', '', '2015-05-01 12:27:10');
INSERT INTO `simpledb`.`messages` (`messagesID`, `from`, `to`, `content`, `delivery_status`, `date`) VALUES (5, 3, 1, 'hello from 3 to 1', '', '2015-05-01 12:27:08');
INSERT INTO `simpledb`.`messages` (`messagesID`, `from`, `to`, `content`, `delivery_status`, `date`) VALUES (6, 3, 2, 'hello from 3 to 2', '', '2015-05-01 12:27:11');

COMMIT;

