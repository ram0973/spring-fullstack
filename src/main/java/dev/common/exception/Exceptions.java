package dev.common.exception;

public class Exceptions {

    public static class EntityAlreadyExistsException extends RuntimeException {
        public EntityAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class ForbiddenOperationException extends RuntimeException{
        public ForbiddenOperationException(String message) {
            super(message);
        }
    }

    public static class EntityPersistActionException extends RuntimeException{
        public EntityPersistActionException(String message) {
            super(message);
        }
    }

    public static class NoSuchEntityException extends RuntimeException {
        public NoSuchEntityException(String message) {
            super(message);
        }
    }
}
