export function mapCampaignType(code: number): string {
  switch (code) {
    case 1: return 'Clip'
    default: return 'Desconocido'
  }
}

export function mapCampaignCategory(code: number): string {
  switch (code) {
    case 1: return 'Creador'
    default: return 'Desconocido'
  }
}

export function mapCampaignSocialmedia(code: number) {
  switch (code) {
    case 1: return "TIKTOK"
    case 2: return "INSTAGRAM"
    case 3: return "YOUTUBE"
    default: return ""
  }
}