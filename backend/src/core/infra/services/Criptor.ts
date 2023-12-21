export interface ICriptor {
  encrypt(text: string): string
  decrypt(text: string): string
}
