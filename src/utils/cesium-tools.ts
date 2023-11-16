import * as Cesium from 'cesium'

/**
 *
 * @param longitude 经度
 * @param latitude 纬度
 * @param height 高度
 * @param ellipsoid 由方程定义的笛卡尔坐标中的二次曲面. 主要使用 用铯来表示行星体的形状
 * @param result
 * @returns 经纬度转笛卡尔坐标 返回的是一个笛卡尔坐标 (z!=高度)
 */
export const fromDegrees = (longitude: number, latitude: number, height?: number, ellipsoid?: Cesium.Ellipsoid, result?: Cesium.Cartesian3) => {
  return Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
}

/* 笛卡尔坐标要转成弧度 */
export const fromCartesian = (cartesian: Cesium.Cartesian3, ellipsoid?: Cesium.Ellipsoid, result?: Cesium.Cartographic) => {
  return Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result)
}

/* 笛卡尔坐标要转成弧度 */
export const toDegrees = (cartesian: Cesium.Cartesian3, ellipsoid?: Cesium.Ellipsoid, result?: Cesium.Cartographic) => {
  // 1.笛卡尔坐标要转成弧度
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result)
  // 2.弧度再转成经纬度
  return {
    longitude: Cesium.Math.toDegrees(cartographic.longitude),
    latitude: Cesium.Math.toDegrees(cartographic.latitude),
    height: cartographic.height
  }
}
