import {
  Button,
  ContainerInput,
  ErrorsInput,
  Input,
  Label,
} from "~/shared/components";
import { useLogin } from "../../hooks";

export function LoginForm() {
  const { handleSubmit, register, errors, isLoading } = useLogin();

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <ContainerInput>
        <Label htmlFor="username" isError={!!errors.username?.message}>
          Username
        </Label>
        <Input
          autoFocus
          id="username"
          {...register("username")}
          placeholder="Type your username"
          disabled={isLoading}
          iserror={!!errors.username?.message}
        />
        <ErrorsInput
          errors={
            errors.username?.message ? [errors.username?.message] : undefined
          }
        />
      </ContainerInput>

      <ContainerInput>
        <Label htmlFor="password" isError={!!errors.password?.message}>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Type your password"
          disabled={isLoading}
          iserror={!!errors.password?.message}
        />
        <ErrorsInput
          errors={
            errors.password?.message ? [errors.password?.message] : undefined
          }
        />
      </ContainerInput>

      <div className="w-full flex flex-col items-center gap-2">
        <Button
          type="submit"
          disabled={isLoading}
          withFeedback={{
            loadingOptions: {
              isLoading,
              typeLoadingIcon: "Points",
            },
          }}
        >
          Entrar
        </Button>
      </div>
    </form>
  );
}
