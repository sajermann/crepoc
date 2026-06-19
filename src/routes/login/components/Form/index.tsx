import {
  Button,
  ContainerInput,
  ErrorsInput,
  Input,
  Label,
} from "~/shared/components";
import { Icons } from "~/shared/components/Icons";
import { useLogin } from "../../hooks";

export function LoginForm() {
  const { handleSubmit, register, errors, isLoading } = useLogin();
  // const isLoading = false;

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <ContainerInput>
        <Label htmlFor="username" isError={!!errors.username?.message}>
          Usuário
        </Label>
        <Input
          autoFocus
          id="username"
          {...register("username")}
          placeholder="Digite seu usuário"
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
          Senha
        </Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Digite sua senha"
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
        <Button type="submit" disabled={isLoading}>
          <div className="flex items-center justify-center gap-2">
            Entrar
            {isLoading && <Icons nameIcon="loadingPoints" className="w-6" />}
          </div>
        </Button>
      </div>
    </form>
  );
}
