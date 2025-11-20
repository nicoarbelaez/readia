# Configuración de OIDC entre GitHub Actions y AWS para despliegue de Lambda con SAM

## Objetivo

Establecer una conexión segura entre GitHub Actions y AWS utilizando OIDC (OpenID Connect) para permitir el despliegue de funciones Lambda mediante AWS SAM sin necesidad de almacenar credenciales permanentes.

## Conceptos Clave

### AWS_ROLE_TO_ASSUME

El valor `AWS_ROLE_TO_ASSUME` representa el ARN (Amazon Resource Name) de un rol IAM en AWS que GitHub Actions puede asumir temporalmente. Este enfoque elimina la necesidad de almacenar credenciales AWS de larga duración en GitHub, utilizando en su lugar tokens JWT temporales obtenidos a través de OIDC.

## Implementación

### 1. Configuración del Proveedor OIDC en AWS

**Procedimiento en Consola AWS:**

1. Acceder a IAM → **Identity Providers**
2. Seleccionar **Add Provider** → **OpenID Connect**
3. Configurar los siguientes parámetros:
   - **Provider URL**: `https://token.actions.githubusercontent.com`
   - **Audience**: `sts.amazonaws.com`

Esta configuración establece a GitHub como un proveedor de identidad confiable para AWS, permitiendo la autenticación basada en tokens JWT emitidos por GitHub.

### 2. Creación del Rol IAM para GitHub Actions

**Política de Confianza Recomendada:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::TU_CUENTA_AWS:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:TU_ORG/TU_REPO:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

**Elementos de Seguridad en la Configuración:**

- La condición `aud` garantiza que los tokens sean válidos solo para AWS STS
- La condición `sub` restringe el acceso a repositorios y ramas específicas
- El uso de `Federated` principal permite la asunción de roles mediante identidad federada

### 3. Políticas de Permisos Específicas

**Política de Despliegue (GitHubActionsDeployPolicy):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3Actions",
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": [
        "arn:aws:s3:::aws-sam-cli-managed-default-samclisourcebucket-*",
        "arn:aws:s3:::aws-sam-cli-managed-default-samclisourcebucket-*/*"
      ]
    }
  ]
}
```

**Política de Seguridad Adicional (OidcSafetyPolicy):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "OidcSafeties",
      "Effect": "Deny",
      "Action": ["sts:AssumeRole"],
      "Resource": "*"
    }
  ]
}
```

La política de seguridad complementaria previene la escalada de privilegios al denegar explícitamente la capacidad de asumir otros roles, manteniendo el principio de menor privilegio.

### 4. Configuración en GitHub

**Creación del Secreto:**

1. Navegar a Repository Settings → **Secrets and variables** → **Actions**
2. Crear nuevo secreto con:
   - **Name**: `AWS_ROLE_TO_ASSUME`
   - **Value**: `arn:aws:iam::123456789012:role/GitHubActions-Deploy-Role`

### 5. Integración en Workflow de GitHub Actions

**Configuración del Workflow:**

```yaml
permissions:
  id-token: write # Habilita el flujo OIDC
  contents: read # Permite acceso al código del repositorio

steps:
  - name: Configure AWS credentials
    uses: aws-actions/configure-aws-credentials@v2
    with:
      role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
      aws-region: us-east-1
```

Esta configuración permite a GitHub Actions obtener credenciales temporales de AWS automáticamente, utilizando el rol IAM configurado para realizar las operaciones de despliegue.

## Validación y Pruebas

1. Realizar un push a la rama autorizada (main en este ejemplo)
2. Verificar en los logs de GitHub Actions que el paso `Configure AWS credentials` muestra el mensaje `Assuming role with OIDC`
3. Confirmar que las operaciones subsiguientes de SAM deploy se ejecuten correctamente

## Recursos Adicionales

Para una explicación visual del proceso, se recomienda el video: [Securely deploy to AWS with GitHub Actions and OIDC](https://www.youtube.com/watch?v=Io5UFJlEJKc&t=562s) que demuestra la implementación completa.
