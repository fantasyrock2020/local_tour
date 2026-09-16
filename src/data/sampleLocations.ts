import { Location, LocationType } from '../types/location';

export const defaultImageCurrentLocation =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD0vLfo0CXBHxWvkpT20n5PAkIVbGC-OVFMSibrjd7uX73l1aq4ZiKKpaI-mleheTgdBSJoswR4yX4ZSPz1mzMFINn2Bv5JpHji-WJzkRdPMeY74Zugy23qXvkqYh0jWmbO0RAH1vKnYynw1XVHUieiPheMlMC2KsGIAybMxiXMhp-L-GuPCCll0e2HPUrpunx2cr1DnU750PkyO_GLPXuHL_pRQsc5IWj_t_d2ol5vcS3lbdEcklIS';

export const hcmcCommunesList: Location[] = [
  // TP. Thủ Đức
  { id: 'hiepbinh', name: 'Phường Hiệp Bình', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Thành phố Thủ Đức'] },
  { id: 'tambinh', name: 'Phường Tam Bình', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Thành phố Thủ Đức'] },
  { id: 'thuduc', name: 'Phường Thủ Đức', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Thành phố Thủ Đức'] },
  { id: 'linhxuan', name: 'Phường Linh Xuân', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Thành phố Thủ Đức'] },
  { id: 'longbinh', name: 'Phường Long Bình', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Thành phố Thủ Đức'] },
  { id: 'ankhanh', name: 'Phường An Khánh', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Thành phố Thủ Đức (Quận 2 cũ)'], priority: 5 },

  // Quận 1
  { id: 'tandinh', name: 'Phường Tân Định', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 1'], priority: 1 },
  { id: 'benthanh', name: 'Phường Bến Thành', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 1'], priority: 2 },
  { id: 'saigon', name: 'Phường Sài Gòn', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 1'], priority: 3 },
  { id: 'cauonglanh', name: 'Phường Cầu Ông Lãnh', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 1'], priority: 12 },

  // Quận 3
  { id: 'banco', name: 'Phường Bàn Cờ', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 3'], priority: 11 },
  { id: 'xuanhoa', name: 'Phường Xuân Hòa', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 3'], priority: 4 },
  { id: 'nhieuloc', name: 'Phường Nhiêu Lộc', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 3'], priority: 18 },

  // Quận 4
  { id: 'vinhhoi', name: 'Phường Vĩnh Hội', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 4'] },
  { id: 'khanhhoi', name: 'Phường Khánh Hội', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 4'] },

  // Quận 5
  { id: 'choquan', name: 'Phường Chợ Quán', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 5'] },
  { id: 'andong', name: 'Phường An Đông', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 5'] },

  // Quận 7
  { id: 'tanmy', name: 'Phường Tân Mỹ', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 7'], priority: 22 },
  { id: 'tanhung', name: 'Phường Tân Hưng', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 7'], priority: 22 },

  // Quận 10
  { id: 'vuonlai', name: 'Phường Vườn Lài', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 10'], priority: 15 },
  { id: 'hoahung', name: 'Phường Hoà Hưng', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 10'], priority: 16 },

  // Quận 12
  { id: 'tanthoihiep', name: 'Phường Tân Thới Hiệp', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 12'], priority: 7 },
  { id: 'anphudong', name: 'Phường An Phú Đông', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận 12'], priority: 23 },

  // Quận Bình Thạnh
  { id: 'giadinh', name: 'Phường Gia Định', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Bình Thạnh'], priority: 6 },
  { id: 'binhthanh', name: 'Phường Bình Thạnh', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Bình Thạnh'] },
  { id: 'thanhmytay', name: 'Phường Thạnh Mỹ Tây', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Bình Thạnh'], priority: 21 },

  // Quận Tân Bình
  { id: 'tansonhoa', name: 'Phường Tân Sơn Hoà', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Tân Bình'], priority: 10 },
  { id: 'tanhoa', name: 'Phường Tân Hoà', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Tân Bình'], priority: 19 },

  // Quận Gò Vấp
  { id: 'hanhthong', name: 'Phường Hạnh Thông', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Gò Vấp'], priority: 20 },
  { id: 'annhon', name: 'Phường An Nhơn', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Gò Vấp'], priority: 9 },
  { id: 'govap', name: 'Phường Gò Vấp', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Gò Vấp'], priority: 8 },
  { id: 'anhoidong', name: 'Phường An Hội Đông', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Gò Vấp'], priority: 13 },
  { id: 'anhoitay', name: 'Phường An Hội Tây', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Gò Vấp'], priority: 14 },
  { id: 'thongtayhoi', name: 'Phường Thông Tây Hội', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Gò Vấp'], priority: 17 },

  // Huyện Bình Chánh
  { id: 'vinhloc', name: 'Xã Vĩnh Lộc', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Huyện Bình Chánh'] },
  { id: 'binhchanh', name: 'Xã Bình Chánh', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Huyện Bình Chánh'] },

  // Quận Tân Phú
  { id: 'tansonnhi', name: 'Phường Tân Sơn Nhì', type: LocationType.COMMUNE, parentId: 'hcm', previousDistricts: ['Quận Tân Phú'], priority: 23 },
];

export const sampleLocations: Location[] = [
  {
    id: 'vungtau',
    name: 'Vũng Tàu',
    type: LocationType.TOUR,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqGPlE45hNBHLkX-V791hGWBNQp2kMzCrzl7Ka0TjhmvB5AEcsHAz7fF9P4HoddAGKieiD0waOntF0GGpq1OXxBRvYRB4PEzTNjoMXFQcJyGCm-QiVCRiS5AEfndmtHANfm0FqMuFtbmzqM4Gl5TQ6trkwzQIZk6T8ztRo245oX5TidgXcLMm9nxSEYk5_O3cIVX0WLrswEwhLshtVpbdqu0TIW4ek3_v0gqf8TIN7YBk464rlUF5m',
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    type: LocationType.TOUR,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjrVbEJtyCqYcxk46goFYi5-37quCK_cJRKzRO3RE0K5sm8sgfwzJz_RsAmdVl2H2thPLS5wyxrpShWodRgxW-lQq1hxk3fviaX96P7ChWUUhPdJNSa2G0GKgEcMHWLUM1rrVCe2Egd6EpjC3gMr-YxbrjUFhpoKwkYeGeodtJEZxjjWGx5_Ot59W-SCUA3Tg8fkmnH3gtouuoOcIbQ02OTBCsqe00SuF3n0jo6Bn12nGPQQm9mYxM',
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    type: LocationType.TOUR,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlGzdZ6oc7tspzB86-ZpB3kQu42CnHXDPmb2GYaOUl9QyyPFDu5tGqVz5RmKuE6hgwTMTOwx63X0bHmyvqrqX0ZkEpxozVVG-xXMe5r0r_N9MzbUUE5nuhk-gOAtZbilRbE4dMo8HoSYX9QdFqSZu6eeyjG6I3jDNNUOGLDxpEd2YSJTxdG7gebFsQIq-SqNUfk8s3KBC9oLLSeqDEiBqc0bGCE2uEZ7BNA8evfpMnjL6trUgVzi8S',
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    type: LocationType.TOUR,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWup1NKP6Ocbd-eanmgPtKOUDIue4618G1cz6COE1_qF9cKzfVAR6lrtXyXAxZVL_z0MAKTsrpQlQeZdjuBSvPP9YZ7W68lR_xYEY9rwc0Gme3n2BNK8mdk-9UjAfjRwt7KMfUP-9CJ1mCAmR7vR7SAq1AFxrgRgL41tXCeoUziLYUrsi8I7G1JDN_KJTzbSvH1zLrahIQSu8zsjDiOGZ8v11bVww511O2o9oRo3mqGfnqF2HclYkX',
  },
  {
    id: 'hcm',
    name: 'TP.HCM',
    type: LocationType.PROVINCE,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDs4kWLXO97V6kMPYoDzFhRbAxZ-8-k5cP6gS8HjuVfXBKohB-gC8PANQQH_uTJNBS9NDDjJBLGc2tphtDK41wSE8fvUHsMc9rrZaqoD8-QYSi5K1GdZR8MLfSqAQjjp6n7383eKv9pkkfgbX5n1Gf-i-eBFQnpY-o4QAT8rSzNv6g9Ukozz36uPSWvEsJ0UHUtVW4XER7FMQdUeCD84rcbPihxg8Ctzq91dvmCXo9F01A8Qh5Zf1-C',
    communes: hcmcCommunesList,
  },
  {
    id: 'hoian',
    name: 'Hội An',
    type: LocationType.TOUR,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpyN2ruhT36AsElnX7wuBvMw9BCj3kBKKVnB8KQ0UAKKiTUwRuyJb_WP_us1ePdMytKqofG_FTuNuJbO6bfKHTliZhJ4Kd3b7j0dnHVpU34ZMQAkM9VWpL7mlR4psp_sqm1v-3nXzJTRBCplQq_SsIIVwnsKhOfyzQhFoZQtKROHrgPv2n76tMdzQ9HBlBR9L89wmQ2PnDpJQTFE1su6pnFAeRBxIy3AAjFyYnCAGvFVKA9_0fzFIR',
  },
];
